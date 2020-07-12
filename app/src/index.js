let title = $("#title")

title.fadeTo("slow", 1, () => {
	setTimeout(() => {
		title.fadeTo("slow", 0, () => {
			window.location = "menu.html"
		})
	}, 250)
})