let body = $("body")

body.fadeTo("slow", 1, () => { })

$("#play").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
})

$("#quit").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.close()
	})
})
