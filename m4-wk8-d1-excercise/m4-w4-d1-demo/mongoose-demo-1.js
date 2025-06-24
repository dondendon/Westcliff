const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://localhost:27017/test'); //OR
//mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const fruitSchema = new mongoose.Schema({
    name: String
  });


const Fruit = mongoose.model('Fruit', fruitSchema);

const apple = new Fruit({ name: 'apple' });
console.log(apple.name);
});