let view = $("#modals")
let modals = {}

view.children().each((index, item) => {
	modals[$(item).attr("id")] = $(item)
})

function hideAll() {
	for (let name in modals) modals[name].css("display", "none")
}

function hideBackground(complete) {
	view.animate({opacity: 0}, 300, () => {
		view.css("opacity", 1)
		view.css("display", "none")
		if (complete) complete()
	})
}

function showModal(name) {
	let modal = modals[name]
	modal.load(name + ".html")
	modal.css("display", "block")
	view.css("display", "block")
}

$(window).on("click", e => {
	if ($(e.target).attr("id") === "modals") hideBackground(hideAll)
})
