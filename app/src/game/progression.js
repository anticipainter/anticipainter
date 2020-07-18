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
	speedUpFactor = 8
	inSequence = false
	sequenceLength = 1
	scanDistance = 0
	sequenceInterval = 1000
	sequenceTiming = 250
	hazardFrequency = 0
	regenerationWanted = false
	events = []

	constructor(game) {
		this.sequence = undefined
		this.index = 0
		this.wave = -1
		this.scoreCount = 0
		this.scoreTotal = 0
		this.speedUp = false
		this.game = game
	}

	start() {
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

	update() {
		let now = new Date().getTime()
		if (this.speedUp) this.baseTime -= (now - this.lastTime) * (this.speedUpFactor - 1)
		this.lastTime = now
		let tileCount = this.getTileCount()
		if (tileCount.count === tileCount.total) this.game.gameVictory()
		this.updateWave(tileCount.count / tileCount.total)
		this.updateTileCount(tileCount.count, tileCount.total)
		this.updateTimer(now)
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
		let progression = this
		this.events.length = 0
		this.events.push(new Event(function() {
			progression.game.display.dimSequence()
		}, this.currentInterval - 200))
		this.events.push(new Event(function() {
			progression.game.player.setEyesExec()
		}, this.currentInterval - 50))
		for (let i = 0; i < this.sequence.length; i++) {
			this.events.push(new Event(function () {
				if (i === 0) {
					progression.inSequence = true
					progression.speedUp = false
					progression.game.player.startSequence()
				}
				progression.game.display.fadeDirection(i)
				progression.game.player.queueMove(progression.sequence[i], true)
				if (i === progression.sequence.length - 1) {
					progression.inSequence = false
					progression.game.player.endSequence()
				}
			}, this.currentInterval + this.currentTiming * i))
		}
		this.events.push(new Event(function() {
			if (progression.regenerationWanted) {
				progression.regenerationWanted = false
				progression.placeHazards()
			}
			progression.game.player.setEyesNorm()
			progression.resetTimer(progression.currentInterval + progression.currentTiming * progression.sequence.length)
		}, this.currentInterval + this.currentTiming * this.sequence.length))
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

	updateTimer(now) {
		if (this.game.player.dead) return
		let elapsed = Math.min(now - this.baseTime, this.currentInterval)
		this.game.display.setTimer((this.currentInterval - elapsed) / 1000, this.currentInterval / 1000)
	}

	generateSequence() {
		if (this.game.player.dead) return
		if (this.regenerationWanted) {
			this.placeHazards()
			this.regenerationWanted = false
		}
		this.sequence = Sequence.generate(this.game.grid, this.game.player, this.sequenceLength, this.scanDistance)
		this.game.display.clear()
		this.game.display.showSequence(this.sequence)
	}

	placeHazards() {
		if (this.game.player.dead) return
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
