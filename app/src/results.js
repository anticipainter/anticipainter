let body = $("body")

body.fadeTo("slow", 1, () => { })

$(function() {
	let params = window.location.search.slice(1).split("&")
	let state = params[0].split("=")[1]
	if (state === "lose") $("#state").text("You Died...")
	if (state === "win") $("#state").text("You Won!")
	$("#score").text(params[1].split("=")[1])
	$("#total").text(params[2].split("=")[1])
})

function fadeToPlay() {
	body.fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
}

function fadeToMenu() {
	body.fadeTo("fast", 0, () => {
		window.location = "menu.html"
	})
}

$("#play").on("click", e => {
	fadeToPlay()
})

$("#menu").on("click", e => {
	fadeToMenu()
})

$(document).on("keydown", (e) => {
	if (e.code === "KeyR" || e.code === "Space") fadeToPlay()
	if (e.code === "Escape") fadeToMenu()
})
