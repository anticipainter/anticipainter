export class Progression {
	constructor(game) {
		this.sequence = undefined
		this.sequenceStart = undefined
		this.index = 0
		this.game = game
	}

	update() {
		if (this.sequence !== undefined && this.sequenceStart === undefined) {
			this.game.player.startSequence()
			this.sequenceStart = new Date().getTime()
		} else if (this.sequence !== undefined) {
			let iterations = (new Date().getTime() - this.sequenceStart) / 250
			while (this.index < iterations && this.index < this.sequence.length) {
				this.game.player.queueMove(this.sequence[this.index], true)
				this.index++
			}
			if (this.index >= this.sequence.length) {
				this.game.player.endSequence()
				this.sequence = undefined
				this.sequenceStart = undefined
				this.index = 0
			}
		}
	}

	runSequence(sequence) {
		this.sequence = sequence
	}
}
