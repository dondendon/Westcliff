const express               =  require('express'),
      expSession            =  require("express-session"),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user"),
      //mongoSanitize         =  require('express-mongo-sanitize'),
      rateLimit             =  require('express-rate-limit'),
      helmet                =  require('helmet');

// xss-clean kept breaking, so i import xss instead
const xss = require('xss'); // core sanitizer function

// Connect to DB
mongoose.connect("mongodb://localhost/auth_demo");

// Apply helmet first (secure headers)
app.use(helmet());

app.use(expSession({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,  // set false for local testing, true for production with HTTPS
        maxAge: 1 * 60 * 1000 // 10 mins
    }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

// OWASP middlewares
//manually sanitize req.body and req.params.
const mongoSanitize = require('express-mongo-sanitize');

app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  // Do NOT sanitize req.query to avoid the crash
  next();
});


const limit = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
});
app.use('/routeName', limit);

app.use(express.json({ limit: '10kb' }));

// new xss code to manually sanitize req.body and req.params. prevent xss to overwrite req.query which seems to be read-only
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  if (req.params) {
    for (const key in req.params) {
      if (typeof req.params[key] === 'string') {
        req.params[key] = xss(req.params[key]);
      }
    }
  }
  next();
});


//=======================
//      R O U T E S
//=======================
app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/userprofile" ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){
});
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register", (req, res) => {
    const { username, email, phone, password } = req.body;

    const errors = [];

    // ✅ Input validation section (near the top)
    if (!username || username.length < 4) {
        errors.push("Username must be at least 4 characters long.");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores.");
    }

    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        errors.push("Password must include both letters and numbers.");
    }

    if (errors.length > 0) {
        return res.render("register", { errors, formData: req.body });
    }

    // ✅ Only run this if validation passed
    User.register(new User({ username, email, phone }), password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register", { errors: [err.message], formData: req.body });
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/login");
        });
    });
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Listen On Server
app.listen(process.env.PORT || 3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");  
    }
});