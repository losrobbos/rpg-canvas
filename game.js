// hol mir den canvas man!!!!

// JSDOC
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#tollesCanvas");
const ctx = canvas.getContext("2d");

// setze die width und height des canvas
// auf die clientWidth und clientHeight, das heißt,
// die width und height die durch CSS gesetzt wurde
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// load background map image
const imgBg = new Image();
imgBg.src = "./assets/images/rpgTilemap.png";

const imgPlayer = new Image();
imgPlayer.src = "./assets/images/Hero.png";

// mit map offset verschieben wir den startpunkt auf der karte
// zu dem bereich, den wir am anfang sehen wollen
// und wo der player steht
const mapOffset = {
  x: -350,
  y: -200,
};

const TILE_SIZE = 64;
// spritesheet tile size berechnung
// sheet width = 832
// sheet height = 1344
// anzahl sheet spalten = 13
// anzahl sheet reihen = 21
// tile größe => breite / spalten = 64x64px

const playerPositionInitial = {
  x: 285,
  y: 190,
};

/** @type {"up" | "down" | "right" | "left"} */
let direction = undefined
let rowAnimation = 10;

window.addEventListener("keydown", (e) => {
  switch(e.key) {
    case "ArrowUp": 
      direction = "up"; break;
    case "ArrowDown": 
      direction = "down"; break;
    case "ArrowLeft": 
      direction = "left"; break;
    case "ArrowRight": 
      direction = "right"; break;
  }
})

window.addEventListener("keyup", (e) => {
  switch(e.key) {
    case "ArrowUp": 
    case "ArrowDown": 
    case "ArrowLeft": 
    case "ArrowRight": 
      direction = undefined;
  }
})

// zähle wie oft schon ein bild gezeichnet wurde
let frames = 0;
let frameIndex = 0;

const gameLoop = () => {

  // set animation row in sheet based on DIRECTION player chose
  switch(direction) {
    case "up": 
      rowAnimation = 8; 
      mapOffset.y++;
      break;
    case "left": 
      mapOffset.x++;
      rowAnimation = 9; 
      break;
    case "down": 
      rowAnimation = 10; 
      mapOffset.y--;
      break;
    case "right": 
      mapOffset.x--;
      rowAnimation = 11; 
      break;
  }

  // bestimme frame position der animation
  if(frames % 6 === 0) {
    frameIndex = frameIndex < 8 ? frameIndex +1 : 0
  }

  // zeichne background
  ctx.drawImage(imgBg, mapOffset.x, mapOffset.y);

  // zeichne playersprite (=ein einzelbild aus spritesheet)
  ctx.drawImage(
    imgPlayer,
    // position von sprite (=einzelbild) im spritesheet
    frameIndex * TILE_SIZE,
    rowAnimation * TILE_SIZE,
    // width & height des Tiles = 64px
    TILE_SIZE,
    TILE_SIZE,
    // position im canvas
    playerPositionInitial.x,
    playerPositionInitial.y,
    // größe im canvas
    TILE_SIZE,
    TILE_SIZE
  );

  frames++;

  // request animation frame methode wartet
  // bis der f*** monitor wieder bereit ist ein bild zu zeichnen
  requestAnimationFrame(gameLoop);
};

// start game loop
gameLoop();
