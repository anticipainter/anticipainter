let title = $("#title")
let player = undefined, eyes = undefined, everything = undefined
let preferences = new Preferences({configName: "user-preferences", defaults: Preferences.defaults})
let volume = preferences.get("audio.volume-master") * preferences.get("audio.volume-sound") / 100
let audio = {
	move: new Audio("res/sound/move.wav"),
	hit: new Audio("res/sound/hit.wav"),
	die: new Audio("res/sound/die.wav")
}

title.fadeTo("slow", 1)
title.load("res/layout/intro.svg")

function animate(delay, duration, step, start, finish) {
	setTimeout(() => {
		player.css("now", 0)
		if (start) start()
		player.animate({now: 1}, {
			duration: duration,
			step: step,
			complete: finish
		})
	}, delay)
}

function play(sound) {
	let audio = sound.cloneNode()
	audio.volume = volume;
	audio.play()
}

function activateTile(id) {
	let tile = $("#tile-" + id)
	tile.removeClass("off")
	tile.addClass("on")
}

function startAnimation() {
	animate(100, 200, now => {
		player.attr("x", now - 2)
	}, () => { play(audio.move); activateTile(1) })

	animate(500, 200, now => {
		player.attr("x", now - 1)
	}, () => { play(audio.move); activateTile(2) })

	animate(1000, 200, now => {
		eyes.attr("transform", `rotate(${now * 90})`)
	})

	animate(1500, 200, now => {
		player.attr("y", (now < 0.25) ? now : (now < 0.75) ? 0.25 : 1 - now)
		if (now > 0.25) {
			let lerp = (now - 0.25) / 0.75
			let bump = (lerp < 0.5) ? 2 * lerp : 2 - 2 * lerp
			everything.attr("transform", `translate(0, ${bump / 50})`)
		}
	}, () => { play(audio.hit) })

	animate(2000, 200, now => {
		eyes.attr("transform", `rotate(${(1 - now) * 90})`)
	})

	animate(2500, 200, now => {
		player.attr("x", now)
	}, () => { play(audio.move); activateTile(3) })

	animate(2800, 200, now => {
		player.attr("x", now + 1)
	}, () => { play(audio.move); activateTile(4) })

	animate(3200, 500, now => {
		player.attr("x", now + 2)
		player.attr("opacity", 1 - now)
	}, () => { play(audio.die) })

	setTimeout(() => {
		title.fadeTo("slow", 0, () => {
			window.location = "menu.html"
		})
	}, 3500)
}

let interval = setInterval(() => {
	player = $("#goggles")
	if (player.length !== 0) {
		eyes = $("#eyes")
		everything = $("#everything")
		clearInterval(interval)
		setTimeout(startAnimation, 500)
	}
}, 1)
