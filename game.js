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

// load player spritesheet image (with animation sprite)
const imgPlayer = new Image();
imgPlayer.src = "./assets/images/Hero.png";

// mit map offset verschieben wir den startpunkt auf der karte
// zu dem bereich, den wir am anfang sehen wollen
// und wo der player steht
const mapOffset = {
  x: -350,
  y: -200,
};

// wie groß in Pixel ist ein Einzelbild (=Sprite) in dem Sheet?
// spritesheet tile size berechnung
// sheet width = 832
// sheet height = 1344
// anzahl sheet spalten = 13
// anzahl sheet reihen = 21
// bildbreite / spalten = 64 (pixel)
const TILE_SIZE = 64;

// kleine border um jeden Sprite, den wir später nicht drawen wollen
const TILE_BORDER = 1;

// wert in pixel, den der player sich in eine Richtung bewegen (pro frame) bewegen soll, wenn ein key gedrückt ist
const PLAYER_SPEED = 2

// player position of the map, relative to top left corner of canvas
const playerPositionInitial = {
  x: 285,
  y: 190,
};

// direction speichert die aktuelle richtung des players 
// (soll nur gesetzt sein, wenn der player gerade einen arrow key gedrückt hält)

/** @type {"up" | "down" | "right" | "left"} */
let direction = undefined;

// start animation => player zeigt nach unten (reihe 10 des Spritesheets)
let rowAnimation = 10;

// ändere direction des player bei arrow key
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

// stoppe aktuelle direction des players bei release des arrow key
// aber stoppe nur die AKTUELLE richtung des players!
// beispiel: player hält erst RIGHT key und dann UP key gedrückt und hält beide. 
// - aktueller player UP move soll nur gestoppt werden, wenn player UP key released, nicht den (alten) RIGHT key  
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction === "up") direction = undefined;
      break;
    case "ArrowDown":
      if (direction === "down") direction = undefined;
      break;
    case "ArrowLeft":
      if (direction === "left") direction = undefined;
      break;
    case "ArrowRight":
      if (direction === "right") direction = undefined;
      break;
  }
});

// zähle wie oft schon ein bild gezeichnet wurde
let frames = 0;
let frameIndex = 0;

const gameLoop = () => {
  // setze die ROW im Character Spritesheet je nach DIRECTION des players
  // beispiel: up => wähle Reihe 8 aus dem Spritesheet mit den UP Animation Sprites / Frames
  // bewege zusätzlich die MAP entgegen der Direction des players! 
  // => so bleibt der player immer in der mitte vom canvas und nur die map bewegt sich!
  switch (direction) {
    case "up":
      rowAnimation = 8;
      mapOffset.y += PLAYER_SPEED;
      break;
    case "left":
      rowAnimation = 9;
      mapOffset.x += PLAYER_SPEED;
      break;
    case "down":
      rowAnimation = 10;
      mapOffset.y -= PLAYER_SPEED;
      break;
    case "right":
      rowAnimation = 11;
      mapOffset.x -= PLAYER_SPEED;
      break;
  }

  // bestimme frame position der animation (also die spalte (!) in der animation row)
  // schalte den sprite nur alle 6 frames der game loop weiter, damit die animation nicht zu schnell läuft
  // animiere den player auch nur, wenn wir der player sich bewegt (=> also direction gesetzt ist)
  if (frames % 6 === 0 && direction) {
    frameIndex = frameIndex < 8 ? frameIndex + 1 : 0;
  }

  // zeichne background
  ctx.drawImage(imgBg, mapOffset.x, mapOffset.y);

  // zeichne playersprite (=ein einzelbild aus spritesheet)
  ctx.drawImage(
    imgPlayer,
    // position von sprite (=einzelbild) im spritesheet
    // aber starte Position erst einen Pixer unter der Border, damit border nicht mitgezeichnet wird
    frameIndex * TILE_SIZE + TILE_BORDER,
    rowAnimation * TILE_SIZE + TILE_BORDER,
    // width & height des Tiles = 64px
    // abzgl. zweimal der border um den sprite => soll nicht gezeichnet werden
    TILE_SIZE - TILE_BORDER*2,
    TILE_SIZE - TILE_BORDER*2,
    // position im canvas
    playerPositionInitial.x,
    playerPositionInitial.y,
    // größe im canvas
    TILE_SIZE,
    TILE_SIZE
  );

  frames++;

  // request animation frame methode wartet
  // bis der f*** monitor wieder bereit ist, ein neues bild zu zeichnen
  requestAnimationFrame(gameLoop);
};

// starte game loop (="slow" endless loop, but fast enough to draw smoothly to screen 60 times a second)
gameLoop();
