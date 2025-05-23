const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(window.innerWidth - 100); // Prevent overflow

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  //Set image position
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // Add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  const imgWidth = item.newimg.width;
  const imgHeight = item.newimg.height;

  // Bounce on X axis
  if (
    item.position.x + imgWidth >= window.innerWidth ||
    item.position.x <= 0
  ) {
    item.velocity.x = -item.velocity.x;
  }

  // Bounce on Y axis
  if (
    item.position.y + imgHeight >= window.innerHeight ||
    item.position.y <= 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}

// Don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen, makePac };
}