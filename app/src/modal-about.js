$("#close").on("click", e => {
	hideBackground(hideAll)
})

$("#modal-about").find("a").on("click", e => {
	e.preventDefault()
	let href = $(e.target).attr("href")
	preload.openExternal(href)
})
