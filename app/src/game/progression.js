import {Hazard} from "./wall/hazard.js"
import {Sequence} from "./sequence.js"
import {Wall} from "./wall/wall.js"

class Event {
	constructor(func, time) {
		this.run = func
		this.time = time
		this.done = false
	}
}

class Wave {
	constructor(attributes, tileFactor) {
		this.sequenceLength = attributes.sequenceLength
		this.scanDistance = attributes.scanDistance
		this.sequenceInterval = attributes.sequenceInterval
		this.sequenceTiming = attributes.sequenceTiming
		this.hazardFrequency = attributes.hazardFrequency
		this.tileFactor = tileFactor
	}
}

export class Progression {
	speedUpDuration = 750
	inSequence = false
	sequenceLength = 1
	scanDistance = 0
	sequenceInterval = 1000
	sequenceTiming = 250
	hazardFrequency = 0
	regenerationWanted = false
	events = []

	constructor(game) {
		this.game = game
		this.sequence = undefined
		this.index = 0
		this.wave = -1
		this.scoreCount = 0
		this.scoreTotal = 0
		this.started = false
		this.speedUp = false
	}

	initialize() {
		this.waves = [
			new Wave({
				"sequenceInterval": 5000,
				"sequenceTiming": 250,
				"sequenceLength": 2,
				"scanDistance": 2,
				"hazardFrequency": 0
			}, 0),
			new Wave({
				"sequenceLength": 2,
				"scanDistance": 2,
				"hazardFrequency": 0.2
			}, 0.05),
			new Wave({
				"sequenceLength": 3,
				"scanDistance": 2,
				"hazardFrequency": 0.25
			}, 0.12),
			new Wave({
				"sequenceLength": 3,
				"scanDistance": 3,
				"hazardFrequency": 0.35
			}, 0.2),
			new Wave({
				"sequenceLength": 4,
				"scanDistance": 2,
				"hazardFrequency": 0.25
			}, 0.3),
			new Wave({
				"sequenceLength": 3,
				"scanDistance": 3,
				"hazardFrequency": 0.5
			}, 0.4),
			new Wave({
				"sequenceLength": 4,
				"scanDistance": 3,
				"hazardFrequency": 0.4
			}, 0.5),
			new Wave({
				"sequenceLength": 5,
				"scanDistance": 2,
				"hazardFrequency": 0.35
			}, 0.6),
			new Wave({
				"sequenceLength": 5,
				"scanDistance": 3,
				"hazardFrequency": 0.5
			}, 0.7),
			new Wave({
				"sequenceLength": 4,
				"scanDistance": 3,
				"hazardFrequency": 0.75
			}, 0.8),
			new Wave({
				"sequenceLength": 5,
				"scanDistance": 3,
				"hazardFrequency": 0.75
			}, 0.9)
		]
		let tileCount = this.getTileCount()
		this.updateWave(tileCount.count / tileCount.total)
		this.baseTime = new Date().getTime()
		this.lastTime = this.baseTime
		this.generateEvents()
	}

	start() {
		this.started = true
	}

	update() {
		if (this.game.player.dead) return
		let now = new Date().getTime()
		if (!this.started) this.baseTime = now
		else if (this.speedUp) this.baseTime -= (now - this.lastTime) * (this.currentInterval / this.speedUpDuration - 1)
		if (this.speedUp && !this.inSequence && now - this.baseTime > this.currentInterval) this.baseTime = now - this.currentInterval // fix sequence starting too fast when breaking speedup
		this.lastTime = now
		let tileCount = this.getTileCount()
		if (tileCount.count === tileCount.total) this.game.gameVictory()
		this.updateWave(tileCount.count / tileCount.total)
		this.updateTileCount(tileCount.count, tileCount.total)
		this.updateTimer(now, this.started)
		for (let event of this.events) {
			if (now - this.baseTime >= event.time && !event.done) {
				event.done = true
				event.run()
			}
		}
	}

	generateEvents() {
		this.currentInterval = this.sequenceInterval
		this.currentTiming = this.sequenceTiming
		this.generateSequence()
		this.events.length = 0
		this.events.push(new Event(function() {
			this.game.display.dimSequence()
		}.bind(this), this.currentInterval - 200))
		this.events.push(new Event(function() {
			this.game.player.setEyesExec()
		}.bind(this), this.currentInterval - 50))
		for (let i = 0; i < this.sequence.length; i++) {
			this.events.push(new Event(function () {
				if (!i) {
					this.inSequence = true
					this.speedUp = false
					this.game.player.startSequence()
				}
				this.game.display.fadeDirection(i)
				this.game.player.queueMove(this.sequence[i], true)
				if (i === this.sequence.length - 1) this.game.player.endSequence()
			}.bind(this), this.currentInterval + this.currentTiming * i))
		}
		this.events.push(new Event(function() {
			if (this.regenerationWanted) {
				this.regenerationWanted = false
				this.placeHazards()
			}
			this.game.player.setEyesNorm()
			this.inSequence = false
			this.resetTimer(this.currentInterval + this.currentTiming * this.sequence.length)
		}.bind(this), this.currentInterval + this.currentTiming * this.sequence.length))
	}

	resetTimer(interval) {
		this.baseTime += interval
		this.generateEvents()
	}

	getTileCount() {
		let count = 0
		let total = 0
		this.game.grid.forEachTile(function(tile) {
			total++
			if (tile.activated) count++
		})
		return {"count": count, "total": total}
	}

	updateWave(tileFactor) {
		for (let i = 0; i < this.waves.length; i++) {
			if (i > this.wave) {
				let wave = this.waves[i]
				if (tileFactor >= wave.tileFactor) {
					if (this.wave < i) {
						this.wave = i
						this.regenerationWanted = true
					}
					if (wave.sequenceLength !== undefined) this.sequenceLength = wave.sequenceLength
					if (wave.scanDistance !== undefined) this.scanDistance = wave.scanDistance
					if (wave.sequenceInterval !== undefined) this.sequenceInterval = wave.sequenceInterval
					if (wave.sequenceTiming !== undefined) this.sequenceTiming = wave.sequenceTiming
					if (wave.hazardFrequency !== undefined) this.hazardFrequency = wave.hazardFrequency
				}
			}
		}
	}

	updateTileCount(count, total) {
		this.game.display.setScore(count, total)
		this.scoreCount = count
		this.scoreTotal = total
		let percent = count / total
	}

	updateTimer(now, updateRing = true) {
		let elapsed = Math.min(now - this.baseTime, this.currentInterval)
		this.game.display.setTimer((this.currentInterval - elapsed) / 1000, this.currentInterval / 1000, updateRing)
	}

	generateSequence() {
		if (this.regenerationWanted) {
			this.placeHazards()
			this.regenerationWanted = false
		}
		this.sequence = Sequence.generate(this.game.grid, this.game.player, this.sequenceLength, this.scanDistance)
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
