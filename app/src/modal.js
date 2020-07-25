let view = $("#modals")
let modals = {}
let activeModal = undefined

view.children().each((index, item) => {
	modals[$(item).attr("id")] = $(item)
})

function hideAll() {
	activeModal = undefined
	for (let name in modals) {
		modals[name].html("")
		modals[name].css("display", "none")
	}
}

function hideBackground(complete) {
	view.animate({opacity: 0}, 300, () => {
		view.css("opacity", 1)
		view.css("display", "none")
		activeModal = undefined
		if (complete) complete()
	})
}

function showModal(name, callback) {
	activeModal = name
	let modal = modals[name]
	modal.load(name + ".html", undefined, callback)
	modal.css("display", "block")
	view.css("display", "block")
}

function isModalActive(name) {
	return name === activeModal
}

$(window).on("click", e => {
	if ($(e.target).attr("id") === "modals") hideBackground(hideAll)
})
