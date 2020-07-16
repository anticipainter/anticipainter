let body = $("body")

body.fadeTo("slow", 1, () => { })

$("#back").on("click", e => {
	body.fadeTo("slow", 0, () => {
		window.location = "menu.html"
	})
})

$("a").on("click", e => {
	e.preventDefault()
	let href = $(e.target).attr("href")
	// shell.openExternal(href)
	preload.openExternal(href)
})
