import {Sequence} from "./sequence.js"
import {Hazard} from "./wall/hazard.js"
import {Wall} from "./wall/wall.js";

export class Progression {
	sequenceLength = 2
	scanDistance = 2
	sequenceInterval = 5000
	sequenceTiming = 250
	hazardFrequency = 0.25

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
					this.game.player.startSequence()
				}
				while (this.index < iterations) {
					this.game.player.queueMove(this.sequence[this.index], true)
					this.index++
				}
			}
		}
		this.updateTimer(now)
		this.updateTileCount()
	}

	updateTimer(now) {
		if (this.game.player.dead) return
		let elapsed = Math.min(now - this.intervalStart, this.currentInterval)
		this.game.display.setTimer((this.currentInterval - elapsed) / 1000)
	}

	updateTileCount() {
		let count = 0
		let total = 0
		this.game.grid.forEachTile(function(tile) {
			total++
			if (tile.activated) count++
		})
		this.game.display.setScore(count, total)
		let percent = count / total
		if (percent < 0.05) {
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
		}
	}

	generateSequence() {
		if (this.game.player.dead) return
		this.placeHazards()
		this.sequence = Sequence.generate(this.game.grid, this.game.player, this.sequenceLength, this.scanDistance)
		this.game.display.clear()
		this.game.display.showSequence(this.sequence)
	}

	placeHazards() {
		let grid = this.game.grid
		let frequency = this.hazardFrequency
		this.game.grid.forEachWall(function(old) {
			let wall
			if (Math.random() < frequency) wall = new Hazard()
			else wall = new Wall()
			grid.setWall(old.position, old.orientation, wall)
			wall.start()
		})
	}
}
