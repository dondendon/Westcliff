// On page load -> generate game board
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};

// Global variables
let i = 0;
let clicks;
let timeScore;

/*start button initiates game and starts counter
initiates game start on button press*/
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);


const endButton = document.getElementById("endGame");
endButton.addEventListener("click", endGame);

let tiles = document.querySelectorAll(".gametile");
let randomOrderArray = [];

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
};

//end button stops the game
const endGame = () => {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    };

/* createRandom number function
creates random number which will later be assigned an icon
creates an array of 12 random numbers*/
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
};


//Set tiles variable for use throughout code

const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.round(Math.random() * (numberOfTiles - 1)) + 1;

        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }
};

const setTiles = () => {
    for (const tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;

        if (tile.innerText < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }
    }
};

let count;
let timer;

//Timer Function -> starts timer when game is started end when game is compvare or game is cancelled.

const startTimer = () => {
    clearInterval(timer);
    count = 0;
    timer = setInterval(() => {
        document.getElementById("timer").firstChild.innerText = count++;

        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
};

// Icons
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];
let n = 0;

//displayTile -> function which listens for click event and displays tile value on click

const displayTile = (e) => {
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");

    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = e.target.getAttribute("id");
    tileIds.push(tileId);

    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n += 2;
    }
};

const checkMatch = (tileIcons, tileIds, n) => {
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

//countClicks -> calculates number of user clicks -> needed to calculate score
const countMoves = () => {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
};

//ClearTiles -> Clear tiles when new game is started;
const clearTiles = () => {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
};

/*match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
if match icons remain displayed and correctly guessed tiles become disabled. */

//countCorrectAnswers -> count the number of tiles with value correct. each time a pair of tiles are matched, add 1 to the coundCorrectAnswers value;

//compvareGAme -> When the number of correct answers == the number of cells the game can end.

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game compvarion. 

const calculateScore = () => {
    timeScore = parseInt(timeScore);
    const calculatedScore = timeScore + clicks;
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
};


//refresh/reset -> click button, invokes endGame() the reset tiles values, and return their default styling.

//additional levels of difficulty
let newRGB;

const generateRGBVal = () => {
    const generateRandomColor = () => Math.round(Math.random() * 255);

    const rgbValue = [];
    for (let i = 0; i <= 2; i++) {
        rgbValue.push(generateRandomColor());
    }
    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    return newRGB;
};

//additional iterations/Future development
// publish leaderboard;
//use api to generate random icon or picture

const resetTiles = () => {
    for (const tile of tiles) {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
};
