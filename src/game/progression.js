import {Sequence} from "./sequence.js"

export class Progression {
	sequenceLength = 3
	scanDistance = 3
	sequenceInterval = 5000
	sequenceTiming = 250

	constructor(game) {
		this.sequence = undefined
		this.index = 0
		this.game = game
	}

	start() {
		this.intervalStart = new Date().getTime()
		this.currentInterval = this.sequenceInterval
		this.currentTiming = this.sequenceTiming
		this.generateSequence()
	}

	update() {
		let now = new Date().getTime()
		/* if (now - this.intervalStart >= this.currentInterval + this.currentTiming * (this.sequence.length - 1)) {

		} else */ if (now - this.intervalStart >= this.currentInterval) {
			let iterations = Math.floor((now - this.intervalStart - this.currentInterval) / this.currentTiming) + 1
			if (this.index >= this.sequence.length) { // if the sequence is finished
				this.game.player.endSequence()
				this.index = 0
				this.intervalStart += this.currentInterval + this.currentTiming * (this.sequence.length - 1)
				this.currentInterval = this.sequenceInterval
				this.currentTiming = this.sequenceTiming
				this.generateSequence()
			} else { // if the sequence is starting or ongoing
				if (this.index === 0) { // if the sequence needs to start
					this.game.player.startSequence()
				}
				while (this.index < iterations) {
					this.game.player.queueMove(this.sequence[this.index], true)
					this.index++
				}
			}
		}
	}

	generateSequence(sequence) {
		this.sequence = Sequence.generate(this.game.grid, this.game.player, 3, 3)
		this.game.display.clear()
		this.game.display.showSequence(this.sequence)
	}
}
