preferences = new Preferences({configName: "user-preferences", defaults: Preferences.defaults})
console.log(Preferences.defaults)

$(() => {
	$("#screen-shake").prop("checked", preferences.get("video.screen-shake"))
	$("#chevrons").prop("checked", preferences.get("video.chevrons"))
	$("#volume-master").val(preferences.get("audio.volume-master"))
	$("#volume-music").val(preferences.get("audio.volume-music"))
	$("#volume-sound").val(preferences.get("audio.volume-sound"))
	$("#pitch-shift").prop("checked", preferences.get("audio.pitch-shift"))
})

$("input[type=checkbox]").on("input", (event) => {
	preferences.set($(event.target).parent().parent().attr("id") + "." + $(event.target).attr("id"), $(event.target).prop("checked"))
	preferences.write()
})

$("input[type=range]").on("mouseup", (event) => {
	preferences.set($(event.target).parent().parent().attr("id") + "." + $(event.target).attr("id"), $(event.target).val())
	preferences.write()
})

$("#done, #cancel").on("click", () => {
	hideBackground()
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
