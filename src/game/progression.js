import {Sequence} from "./sequence.js"

export class Progression {
	sequenceLength = 3
	scanDistance = 3
	sequenceInterval = 3000
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
		this.sequence = Sequence.generate(this.game.grid, this.game.player, 3, 3)
	}

	update() {
		let now = new Date().getTime()
		/* if (now - this.intervalStart >= this.currentInterval + this.currentTiming * (this.sequence.length - 1)) {

		} else */ if (now - this.intervalStart >= this.currentInterval) {
			let iterations = Math.floor((now - this.intervalStart - this.currentInterval) / this.currentTiming) + 1
			if (iterations > this.sequence.length) { // if the sequence is finished
				this.intervalStart += this.currentInterval + this.currentTiming * (this.sequence.length - 1)
				this.currentInterval = this.sequenceInterval
				this.currentTiming = this.sequenceTiming
				this.index = 0
				this.game.player.endSequence()
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

	runSequence(sequence) {
		this.sequence = sequence
	}
}
