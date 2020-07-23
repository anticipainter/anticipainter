$("#hide").on("click", () => {
	hideBackground()
})

$("#menu").on("click", () => {
	hideBackground(hideAll)
	$("body").fadeTo("slow", 0, () => {
		window.location = "menu.html"
	})
})

$("#restart").on("click", () => {
	hideBackground(hideAll)
	$("body").fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
})
