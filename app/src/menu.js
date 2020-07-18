let body = $("body")

body.fadeTo("slow", 1, () => { })

$("#logo").load("res/layout/logo.svg")

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

let frame = 150
setInterval(() => {
	let loop = (frame++) % 300
	if (loop <= 15) {
		let percent = loop / 15
		let opacity = percent < 0.5 ? 1 - 2 * percent : 2 * percent - 1
		$("#eyes").attr("opacity", opacity)
	}
}, 1000 / 60)
