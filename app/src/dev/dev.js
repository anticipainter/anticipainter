import Anticipainter from "./anticipainter.js"

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

let game = new Anticipainter(app, 1)

body.hide()

$(() => {
	body.show()
	$("#hud").fadeTo(1000, 1, () => {})
})
