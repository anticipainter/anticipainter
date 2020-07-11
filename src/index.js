import {Game} from "./game/game.js"

const app = new PIXI.Application({

})
document.body.appendChild(app.view)
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let game = new Game(app)


