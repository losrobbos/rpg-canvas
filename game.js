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

// image.onload event is fired when
// image is fully loaded and accessible
// and therefore: drawable
imgBg.onload = () => {

  // this method is nice to fill the whole canvas with out image
  // this might be useful if image and canvas have same aspect ratio and
  // we want to see the FULL background, not just a part
  // Beispiel: Zelda NES
  // ctx.drawImage(imgBg, 0, 0, canvas.width, canvas.height)

  imgPlayer.onload = () => {
    const TILE_SIZE = 64;
    // spritesheet tile size berechnung
    // sheet width = 832
    // sheet height = 1344
    // anzahl sheet spalten = 13
    // anzahl sheet reihen = 21
    // tile größe => breite / spalten = 64x64px

    const rowAnimation = 10;

    const playerPositionInitial = {
      x: 285,
      y: 190,
    };

    for(let colSprite=0; colSprite<=8; colSprite++) {

      setTimeout(() => {

        // zeichne background
        ctx.drawImage(imgBg, mapOffset.x, mapOffset.y);

        // zeichne playersprite (=ein einzelbild aus spritesheet)
        ctx.drawImage(
          imgPlayer,
          // position von sprite (=einzelbild) im spritesheet
          colSprite * TILE_SIZE,
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
      }, 100 * colSprite);
    }
  };
};

