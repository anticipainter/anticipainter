let title = $("#title")

title.fadeTo("slow", 1, () => {
	setTimeout(() => {
		title.fadeTo("slow", 0, () => {
			window.location = "menu.html"
		})
	}, 250)
})

title.load("res/layout/cover.svg")

let interval = setInterval(() => {
	let text = $("text")
	if (text.length !== 0) {
		clearInterval(interval)
		text.attr("y", -1000)
	}
}, 1)
