import {Direction} from "../util.js";

export class Display {
	constructor() {
		this.view = {
			main: $("#hud"),
			sequence: $("#sequence")
		}
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