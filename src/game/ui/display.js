import {Direction} from "../util.js";
import {Vector} from "../vector.js";

export class Display {
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
	}

	start() {
		this.view.number = $("#timer-number")
		this.view.sector = $("#timer-sector")
	}

	setTimer(time) {
		let num = Math.ceil(time)
		let angle = Math.round((1 - (time / 5)) * 360)
		this.view.number.text(num)
		this.view.sector.attr("d", this.getTimerPath(angle))
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
		for (let direction of sequence) {
			let path = this.getResourcePath(direction)
			this.view.sequence.append(`
				<div class="item">
					<img class="arrow" src="${path}" alt="arrow"/>
				</div>
			`)
		}
	}

	getResourcePath(direction) {
		if (direction === Direction.LEFT) return "res/drawable/arrow_left.svg"
		if (direction === Direction.RIGHT) return "res/drawable/arrow_right.svg"
		if (direction === Direction.UP) return "res/drawable/arrow_up.svg"
		if (direction === Direction.DOWN) return "res/drawable/arrow_down.svg"
	}
}