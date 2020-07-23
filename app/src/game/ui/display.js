import {Direction} from "../util.js";
import {Vector} from "../vector.js";

export class Display {
	arrowScaleMax = 1.3
	arrowBounceDuration = 150

	constructor(game) {
		this.game = game
		$("#timer").load("res/drawable/timer.svg")
		this.view = {
			main: $("#hud"),
			sequence: $("#sequence"),
			sector: $("#timer-sector"),
			numerator: $("#score-numerator"),
			denominator: $("#score-denominator")
		}
		this.useChevrons = this.game.preferences.get("video.chevrons")
	}

	start() {
		this.view.number = $("#timer-number")
		this.view.sector = $("#timer-sector")
	}

	setTimer(time, max, updateRing = true) {
		let num = Math.ceil(time)
		let angle = Math.round((1 - (time / Math.ceil(max))) * 360)
		this.view.number.text(num)
		if (updateRing) this.view.sector.attr("d", this.getTimerPath(angle))
	}

	setScore(count, total) {
		this.view.numerator.text(count)
		this.view.denominator.text(total)
	}

	getTimerPath(percent) {
		let start = new Vector(500, 0)
		let mid = new Vector(500, 500)
		let offset = Vector.rotate(new Vector(0, 500), percent).getRounded()
		let end = Vector.sub(mid, offset)
		let radius = 500
		let arcSweep = percent < 180 ? 1 : 0
		return `
			M ${start.x} ${start.y}
			A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}
			L ${mid.x} ${mid.y}
			L ${start.x} ${start.y}
		`
	}

	clear() {
		this.view.sequence.empty()
	}

	showSequence(sequence) {
		let i = 0;
		for (let direction of sequence) {
			if (direction !== undefined) {
				let path = this.getResourcePath(direction)
				let index = i++
				this.view.sequence.append(`<div id="item-${index}" class="item"></div>`)
				$(`#item-${index}`).load(path)
			}
		}
	}

	dimSequence() {
		for (let child of this.view.sequence.children()) {
			$(child).animate({opacity: 0.25}, 0, () => {})
		}
	}

	fadeDirection(index) {
		let child = $(this.view.sequence.children()[index])
		child.animate({opacity: 1.0}, 100, function() { })
		let maxScale = this.arrowScaleMax - 1
		let arrow = child.find("#scale")
		arrow.animate({test: 1}, {
			duration: this.arrowBounceDuration,
			step: function(now) {
				let scale = 1
				if (now < 0.5) scale += maxScale * (now * 2)
				else scale += maxScale * 2 * (1 - now)
				arrow.attr("transform", `scale(${scale})`)
		}})
	}

	getResourcePath(direction) {
		let typeName, directionName
		if (this.useChevrons) typeName = "chevron"
		else typeName = "arrow"
		if (direction === Direction.LEFT) directionName = "left"
		else if (direction === Direction.RIGHT) directionName = "right"
		else if (direction === Direction.UP) directionName = "up"
		else if (direction === Direction.DOWN) directionName = "down"
		return "res/drawable/" + typeName + "_" + directionName + ".svg"
	}
}