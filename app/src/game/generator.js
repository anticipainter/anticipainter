import {Default} from "./tile/default.js"
import {Direction, Orientation} from "./util.js"
import {Tracer} from "./tile/tracer.js"
import {Vector} from "./vector.js"
import {Wall} from "./wall/wall.js"

export class Generator {
	constructor(grid) {
		this.grid = grid
	}

	findAvailable() { // find an available tile
		let candidates = []
		for (let y = 0; y < this.grid.size.y; y++) {
			for (let x = 0; x < this.grid.size.x; x++) {
				let tile = this.grid.getTile(x, y)
				if (tile === undefined || tile instanceof Tracer) {
					candidates.push(new Vector(x, y))
				}
			}
		}
		return candidates[Math.floor(Math.random() * candidates.length)]
	}

	findDirection(position) { // find a direction for a tile that doesn't directly face the edge of the grid
		let directions = Direction.all()
		let valid = []
		for (let i = 0; i < directions.length; i++) {
			let next = Vector.add(position, Direction.toVector(directions[i]))
			if (next.x >= 0 && next.x < this.grid.size.x && next.y >= 0 && next.y < this.grid.size.y) valid.push(directions[i])
		}
		return valid[Math.floor(Math.random() * valid.length)]
	}

	surround(position) { // surround a tile with walls
		let directions = Direction.all()
		for (let i = 0; i < directions.length; i++)
			this.grid.setWall(Direction.wallCoordinates(position, directions[i]), Direction.toOrientation(directions[i]), new Wall())
	}

	open(position, direction) { // open (remove) one of the four walls surrounding a tile in a specified direction
		if (direction === Direction.LEFT) this.grid.removeWall(position.x, position.y, Orientation.VERTICAL)
		else if (direction === Direction.RIGHT) this.grid.removeWall(position.x + 1, position.y, Orientation.VERTICAL)
		else if (direction === Direction.UP) this.grid.removeWall(position.x, position.y, Orientation.HORIZONTAL)
		else if (direction === Direction.DOWN) this.grid.removeWall(position.x, position.y + 1, Orientation.HORIZONTAL)
	}

	generate() {
		let start = this.findAvailable()
		this.grid.setTile(start, new Default())
		this.surround(start)
		while (true) {
			let base = this.findAvailable()
			if (base === undefined) break
			let current = base
			while (!(this.grid.getTile(current) instanceof Default)) {
				let direction = this.findDirection(current)
				this.grid.setTile(current, new Tracer(direction))
				current = Vector.add(current, Direction.toVector(direction))
			}
			let lastDirection = undefined
			current = base
			while (!(this.grid.getTile(current) instanceof Default)) {
				let direction = this.grid.getTile(current).direction
				this.grid.setTile(current, new Default())
				this.surround(current)
				if (lastDirection !== undefined) this.open(current, Direction.inverse(lastDirection))
				current = Vector.add(current, Direction.toVector(direction))
				lastDirection = direction
			}
			this.open(current, Direction.inverse(lastDirection))
		}
	}
}
