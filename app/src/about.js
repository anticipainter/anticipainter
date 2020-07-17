let body = $("body")

body.fadeTo("slow", 1, () => { })

function fadeToMenu() {
	body.fadeTo("slow", 0, () => {
		window.location = "menu.html"
	})
}

$("#back").on("click", e => {
	fadeToMenu()
})

$("a").on("click", e => {
	e.preventDefault()
	let href = $(e.target).attr("href")
	preload.openExternal(href)
})

$(document).on("keydown", (e) => {
	if (e.code === "Escape") fadeToMenu()
})
