import {Game} from "./game/game.js"

let body = $("body")

const app = new PIXI.Application({
	antialias: true,
	backgroundColor: 0x263238
})

let view = $("#game")
view.append(app.view)
app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoDensity = true
app.renderer.resize(view.innerWidth(), view.innerHeight())

let game = new Game(app)

body.fadeTo("slow", 1, () => {
	game.progression.start()
})

let keys = []
$(document).on("keydown", function(event) {
	if (!keys.includes(event.which)) {
		keys.push(event.which)
		game.keyDown(event.which)
	}
})

$(() => {
	$(document).swipe({
		swipe: (event, direction, distance, duration, fingerCount, fingerData) => {
			// window.location = "menu.html"
			if (direction === "left") game.keyDown(65)
			else if (direction === "right") game.keyDown(68)
			else if (direction === "up") game.keyDown(87)
			else if (direction === "down") game.keyDown(83)
		}
	})
})

$(document).on("keyup", function(event) {
	if (keys.includes(event.which)) game.keyUp(event.which)
	keys = keys.filter(key => key !== event.which)
})

$(document).on("blur", function() {
	keys.length = 0
})

$(document).on("click", function() {
	game.click()
})
