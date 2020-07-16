import {Hazard} from "./wall/hazard.js"
import {Sequence} from "./sequence.js"
import {Wall} from "./wall/wall.js"

export class Progression {
	sequenceLength = 2
	scanDistance = 2
	sequenceInterval = 5000
	sequenceTiming = 250
	hazardFrequency = 0
	regenerationWanted = false

	constructor(game) {
		this.sequence = undefined
		this.index = 0
		this.wave = 0
		this.scoreCount = 0
		this.scoreTotal = 0
		this.game = game
	}

	start() {
		this.intervalStart = new Date().getTime()
		this.currentInterval = this.sequenceInterval
		this.currentTiming = this.sequenceTiming
		this.generateSequence()
		this.placeHazards()
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
					this.game.display.dimSequence()
					this.game.player.startSequence()
				}
				while (this.index < iterations) {
					this.game.display.fadeDirection(this.index)
					if (this.sequence[this.index] !== undefined) {
						this.game.player.queueMove(this.sequence[this.index], true)
						if (this.index === this.sequence.length - 2) this.game.player.endSequence()
					}
					this.index++
				}
			}
		} else if (now - this.intervalStart >= this.currentInterval - 200) {
			this.game.display.dimSequence()
		}
		this.updateTimer(now)
		this.updateTileCount()
	}

	updateTimer(now) {
		if (this.game.player.dead) return
		let elapsed = Math.min(now - this.intervalStart, this.currentInterval)
		this.game.display.setTimer((this.currentInterval - elapsed) / 1000, this.currentInterval / 1000)
	}

	updateTileCount() {
		let count = 0
		let total = 0
		this.game.grid.forEachTile(function(tile) {
			total++
			if (tile.activated) count++
		})
		this.game.display.setScore(count, total)
		this.scoreCount = count
		this.scoreTotal = total
		let percent = count / total
		if (count === total) {
			this.game.gameVictory()
		}
		/* if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.25
		} else if (percent < 0.25) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
		} else if (percent < 0.5) {
			this.sequenceLength = 4
			this.scanDistance = 4
			this.hazardFrequency = 0.5
		} else {
			this.sequenceLength = 5
			this.scanDistance = 5
			this.hazardFrequency = 0.8
		} */
		// Progression that includes timing changes
		/* if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0
			if (this.wave < 0) this.regenerationWanted = true
			this.wave = 0
		} else if (percent < 0.1) {
			this.sequenceInterval = 5000
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.2
			if (this.wave < 1) this.regenerationWanted = true
			this.wave = 1
		} else if (percent < 0.2) {
			this.sequenceInterval = 5000
			this.sequenceLength = 3
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 2) this.regenerationWanted = true
			this.wave = 2
		} else if (percent < 0.3) {
			this.sequenceInterval = 5000
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 3) this.regenerationWanted = true
			this.wave = 3
		} else if (percent < 0.4) {
			this.sequenceInterval = 8000
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 4) this.regenerationWanted = true
			this.wave = 4
		} else if (percent < 0.5) {
			this.sequenceInterval = 5000
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 5) this.regenerationWanted = true
			this.wave = 5
		} else if (percent < 0.6) {
			this.sequenceInterval = 3000
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 6) this.regenerationWanted = true
			this.wave = 6
		} else if (percent < 0.7) {
			this.sequenceInterval = 8000
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 7) this.regenerationWanted = true
			this.wave = 7
		} */
		if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0
			if (this.wave < 0) this.regenerationWanted = true
			this.wave = 0
		} else if (percent < 0.12) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.2
			if (this.wave < 1) this.regenerationWanted = true
			this.wave = 1
		} else if (percent < 0.2) {
			this.sequenceLength = 3
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 2) this.regenerationWanted = true
			this.wave = 2
		} else if (percent < 0.3) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 3) this.regenerationWanted = true
			this.wave = 3
		} else if (percent < 0.4) {
			this.sequenceLength = 4
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 4) this.regenerationWanted = true
			this.wave = 4
		} else if (percent < 0.5) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 5) this.regenerationWanted = true
			this.wave = 5
		} else if (percent < 0.6) {
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.4
			if (this.wave < 6) this.regenerationWanted = true
			this.wave = 6
		} else if (percent < 0.7) {
			this.sequenceLength = 5
			this.scanDistance = 2
			this.hazardFrequency = 0.35
			if (this.wave < 7) this.regenerationWanted = true
			this.wave = 7
		} else if (percent < 0.8) {
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 8) this.regenerationWanted = true
			this.wave = 8
		} else if (percent < 0.9) {
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.75
			if (this.wave < 9) this.regenerationWanted = true
			this.wave = 9
		} else {
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.75
			if (this.wave < 10) this.regenerationWanted = true
			this.wave = 10
		}
	}

	generateSequence() {
		if (this.game.player.dead) return
		if (this.regenerationWanted) {
			this.placeHazards()
			this.regenerationWanted = false
		}
		this.sequence = Sequence.generate(this.game.grid, this.game.player, this.sequenceLength, this.scanDistance)
		this.sequence.push(undefined)
		this.game.display.clear()
		this.game.display.showSequence(this.sequence)
	}

	placeHazards() {
		let grid = this.game.grid
		let frequency = this.hazardFrequency
		this.game.grid.forEachWall(function(old) {
			let Type = Math.random() < frequency ? Hazard : Wall
			if (typeof old === Type) return
			let wall = new Type()
			grid.setWall(old.position, old.orientation, wall)
			wall.start()
		})
	}
}
