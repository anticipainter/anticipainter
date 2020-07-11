import {Grid} from "./grid.js";
import {Vector} from "./vector.js";
import {Direction, Orientation} from "./util.js";
import {Tile} from "./tile/tile.js";
import {Default} from "./tile/default.js";
import {Tracer} from "./tile/tracer.js";
import {Wall} from "./wall/wall.js";

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

	addDirection(position, direction) { // move in a direction from a certain position
		if (direction === Direction.LEFT) return new Vector(position.x - 1, position.y)
		else if (direction === Direction.RIGHT) return new Vector(position.x + 1, position.y)
		else if (direction === Direction.UP) return new Vector(position.x, position.y - 1)
		else if (direction === Direction.DOWN) return new Vector(position.x, position.y + 1)
	}

	findDirection(position) { // find a direction for a tile that doesn't directly face the edge of the grid
		let directions = Direction.all()
		let valid = []
		for (let i = 0; i < directions.length; i++) {
			let next = this.addDirection(position, directions[i])
			if (next.x >= 0 && next.x < this.grid.size.x && next.y >= 0 && next.y < this.grid.size.y) valid.push(directions[i])
		}
		return valid[Math.floor(Math.random() * valid.length)]
	}

	surround(position) { // surround a tile with walls
		this.grid.setWall(position.x - 1, position.y, Orientation.VERTICAL, new Wall())
		this.grid.setWall(position.x, position.y, Orientation.VERTICAL, new Wall())
		this.grid.setWall(position.x, position.y - 1, Orientation.HORIZONTAL, new Wall())
		this.grid.setWall(position.x, position.y, Orientation.HORIZONTAL, new Wall())
	}

	inverse(direction) {
		if (direction === Direction.LEFT) return Direction.RIGHT
		if (direction === Direction.RIGHT) return Direction.LEFT
		if (direction === Direction.UP) return Direction.DOWN
		if (direction === Direction.DOWN) return Direction.UP
	}

	open(position, direction) { // open (remove) one of the four walls surrounding a tile in a specified direction
		if (direction === Direction.LEFT) this.grid.removeWall(position.x - 1, position.y, Orientation.VERTICAL)
		else if (direction === Direction.RIGHT) this.grid.removeWall(position.x, position.y, Orientation.VERTICAL)
		else if (direction === Direction.UP) this.grid.removeWall(position.x, position.y - 1, Orientation.HORIZONTAL)
		else if (direction === Direction.DOWN) this.grid.removeWall(position.x, position.y, Orientation.HORIZONTAL)
	}

	generate() {
		/* let start = new Vector(
			Math.floor(Math.random() * this.grid.size.x),
			Math.floor(Math.random() * this.grid.size.y)
		) */
		let start = this.findAvailable()
		this.grid.setTile(start, new Default())
		this.surround(start)

		/* let base = new Vector(
			Math.floor(Math.random() * this.grid.size.x),
			Math.floor(Math.random() * this.grid.size.y)
		) */
		while (true) {
			let base = this.findAvailable()
			if (base === undefined) break
			let current = base
			while (!(this.grid.getTile(current) instanceof Default)) {
				let direction = this.findDirection(current)
				this.grid.setTile(current, new Tracer(direction))
				current = this.addDirection(current, direction)
			}
			let lastDirection = undefined
			current = base
			while (!(this.grid.getTile(current) instanceof Default)) {
				let direction = this.grid.getTile(current).direction
				this.grid.setTile(current, new Default())
				this.surround(current)
				if (lastDirection !== undefined) this.open(current, this.inverse(lastDirection))
				current = this.addDirection(current, direction)
				lastDirection = direction
			}
			this.open(current, this.inverse(lastDirection))
		}
	}
}
