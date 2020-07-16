import {Direction} from "./util.js"
import {Hazard} from "./wall/hazard.js"
import {Vector} from "./vector.js"

function scanWall(grid, position, direction) {
	return grid.getWall(Direction.wallCoordinates(position, direction), Direction.toOrientation(direction))
}

class Tracker {
	constructor(position, lastMove) {
		this.position = position
		this.lastMoves = [lastMove]
	}

	step(grid) {
		let directions = Direction.all()
		let valid = []
		for (let i = 0; i < directions.length; i++) {
			if (
				scanWall(grid, this.position, directions[i]) === undefined &&
				!this.lastMoves.includes(Direction.inverse(directions[i]))
			) {
				let next = Vector.add(this.position, Direction.toVector(directions[i]))
				valid.push(new Tracker(next, directions[i]))
			}
		}
		return valid
	}
}

export class Sequence {
	static generate(grid, player, length, scanDistance) {
		let allTrackers = []
		let trackers = [new Tracker(player.position)]
		let newTrackers = []
		for (let i = 0; i < scanDistance; i++) {
			for (let j = 0; j < trackers.length; j++) {
				let steps = trackers[j].step(grid)
				for (let k = 0; k < steps.length; k++) {
					let duplicate = false
					for (let m = 0; m < newTrackers.length; m++) {
						if (Vector.equals(steps[k].position, newTrackers[m].position)) {
							duplicate = true
							newTrackers[m].lastMoves = newTrackers[m].lastMoves.concat(steps[k].lastMoves)
							break
						}
					}
					if (!duplicate) newTrackers.push(steps[k])
				}
			}
			allTrackers = allTrackers.concat(trackers)
			trackers.length = 0
			trackers = trackers.concat(newTrackers)
			newTrackers.length = 0
		}
		allTrackers = allTrackers.concat(trackers)
		let sequence = []
		let position = allTrackers[Math.floor(Math.random() * allTrackers.length)].position
		for (let i = 0; i < length; i++) {
			let directions = Direction.all()
			let valid = []
			for (let j = 0; j < directions.length; j++) {
				if (!(scanWall(grid, position, directions[j]) instanceof Hazard)) valid.push(directions[j])
			}
			let direction = valid[Math.floor(Math.random() * valid.length)]
			position = Vector.add(position, Direction.toVector(direction))
			sequence.push(direction)
		}
		return sequence
	}
}
