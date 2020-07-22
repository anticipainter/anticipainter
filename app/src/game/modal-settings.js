preferences = new Preferences({
	configName: "user-preferences",
	defaults: {
		video: {
			"screen-shake": true,
			"use-chevrons": false
		},
		audio: {
			"volume-master": 5,
			"volume-music": 5,
			"volume-sound": 5,
			"pitch-bend": true
		}
	}
})

$(() => {
	$("#screen-shake").prop("checked", preferences.get("video.screen-shake"))
	$("#use-chevrons").prop("checked", preferences.get("video.use-chevrons"))
	$("#volume-master").val(preferences.get("audio.volume-master"))
	$("#volume-music").val(preferences.get("audio.volume-music"))
	$("#volume-sound").val(preferences.get("audio.volume-sound"))
	$("#pitch-bend").prop("checked", preferences.get("audio.pitch-bend"))
})

$("#cancel").on("click", () => {
	hideBackground()
})

$("#save").on("click", () => {
	preferences.set("video.screen-shake", $("#screen-shake").prop("checked"))
	preferences.set("video.use-chevrons", $("#use-chevrons").prop("checked"))
	preferences.set("audio.volume-master", $("#volume-master").val())
	preferences.set("audio.volume-music", $("#volume-music").val())
	preferences.set("audio.volume-sound", $("#volume-sound").val())
	preferences.set("audio.pitch-bend", $("#pitch-bend").prop("checked"))
	preferences.write()
	hideBackground()
})
