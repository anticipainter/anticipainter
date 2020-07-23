let body = $("body")

body.fadeTo("slow", 1, () => { })

$("#logo").load("res/layout/cover.svg")

$("#play").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.location = "play.html"
	})
})

$("#settings").on("click", e => {
	showModal("modal-settings")
})

$("#about").on("click", e => {
	showModal("modal-about")
})

$("#quit").on("click", e => {
	body.fadeTo("fast", 0, () => {
		window.close()
	})
})

$(document).on("keydown", (e) => {
	if (e.code === "Escape") window.close()
})

function wink() {
	let eye = $("#right-eye")
	eye.css("to", 0)
	eye.stop()
	eye.animate({to: 1}, {
		duration: 500,
		step: now => {
			let opacity = now < 0.5 ? 1 - 4 * now : 4 * now - 3
			eye.attr("opacity", Math.max(opacity, 0))
		}
	})
}

setTimeout(() => {
	let text = $("text")
	text.animate({test: 1.0}, {
		duration: 1000,
		step: now => {
			text.attr("opacity", now)
			text.attr("transform", `translate(${(1-now) * 200})`)
		}
	})
}, 200)

let buttons = $("#buttons")
$(() => {
	buttons.children().each((index, button) => {
		$(button).css("opacity", 0)
		setTimeout(() => {
			let btn = $(button).find("button")
			$(button).animate({opacity: 1}, {
				duration: 500,
				step: now => {
					btn.css("top", (1-now) * 20)
				}
			})
		}, 500 + 250 * index)
	})
})

let interval = setInterval(() => {
	let text = $("text")
	if (text.length !== 0) {
		clearInterval(interval)
		text.attr("y", -1000)
		text.attr("opacity", 0)
		let player = $("#player")
		player.addClass("mouse")
		player.attr("onclick", "wink()")
	}
}, 1)
