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

$("#play").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
})

$("#menu").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "menu.html"
	})
})
