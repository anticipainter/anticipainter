import {Game} from "./game/game.js"

const app = new PIXI.Application({
	antialias: true,
	backgroundColor: 0x263238
})
$("#game").append(app.view)
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let game = new Game(app)

let keys = []
$(document).keydown(function(event) {
	if (!keys.includes(event.which)) {
		keys.push(event.which)
		game.keyPress(event.which)
	}
})
$(document).keyup(function(event) {
	keys = keys.filter(key => key !== event.which)
})
$(document).blur(function() {
	keys.length = 0
})
