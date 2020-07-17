let body = $("body")

body.fadeTo("slow", 1, () => { })

$("#play").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
})

$("#about").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "about.html"
	})
})

$("#quit").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.close()
	})
})

$(document).on("keydown", (e) => {
	if (e.code === "Escape") window.close()
})
