preferences = new Preferences({configName: "user-preferences", defaults: Preferences.defaults})

$(".checkbox>span").load("res/drawable/checkbox.svg")

$(() => {
	setCheckbox("#screen-shake", preferences.get("video.screen-shake"))
	setCheckbox("#chevrons", preferences.get("video.chevrons"))
	$("#volume-master").val(preferences.get("audio.volume-master"))
	$("#volume-music").val(preferences.get("audio.volume-music"))
	$("#volume-sound").val(preferences.get("audio.volume-sound"))
	setCheckbox("#pitch-shift", preferences.get("audio.pitch-shift"))
})

function setCheckbox(id, value) {
	$(id).prop("checked", value)
	$(id).parent().find("#cutout").attr("opacity", value ? 1 : 0)
}

$("input[type=checkbox]").on("input", (event) => {
	let type = $(event.target).parent().parent().parent().attr("id")
	let id = $(event.target).attr("id")
	let checked = $(event.target).prop("checked")
	let cutout = $(event.target).parent().find("#cutout")
	cutout.css("now", 0)
	cutout.animate({now: 1}, {
		duration: 200,
		step: now => {
			cutout.attr("opacity", checked ? now : 1 - now)
		}
	})
	preferences.set(type + '.' + id, checked)
	preferences.write()
})

$("input[type=range]").on("mouseup", (event) => {
	preferences.set($(event.target).parent().parent().attr("id") + "." + $(event.target).attr("id"), $(event.target).val())
	preferences.write()
})

$("#done, #cancel").on("click", () => {
	hideBackground(hideAll)
})

$("#save").on("click", () => {
	preferences.set("video.screen-shake", $("#screen-shake").prop("checked"))
	preferences.set("video.chevrons", $("#chevrons").prop("checked"))
	preferences.set("audio.volume-master", $("#volume-master").val())
	preferences.set("audio.volume-music", $("#volume-music").val())
	preferences.set("audio.volume-sound", $("#volume-sound").val())
	preferences.set("audio.pitch-shift", $("#pitch-shift").prop("checked"))
	preferences.write()
	hideBackground()
})
