let preferences = new Preferences({configName: "user-preferences", defaults: Preferences.defaults})
let audio = {
	hover: new Audio("res/sound/button_hover.wav"),
	click: new Audio("res/sound/button_click.wav")
}

export function bindAudio(target) {
	target/*.on("mouseenter", e => {
		let sound = audio.hover.cloneNode()
		sound.volume = preferences.get("audio.volume-master") * preferences.get("audio.volume-sound") / 200
		sound.play()
	})*/.on("click", e => {
		let sound = audio.click.cloneNode()
		sound.volume = preferences.get("audio.volume-master") * preferences.get("audio.volume-sound") / 100
		sound.play()
	})
}
