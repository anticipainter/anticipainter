import {Vector} from "./vector.js";
import {clamp, Orientation} from "./util.js";

export class Grid {
	constructor(width = 0, height = 0) {
		this.size = new Vector(width, height)
		this.tiles = []
		this.verticalWalls = []
		this.horizontalWalls = []
		for (let y = 0; y < this.size.y; y++) {
			this.tiles.push([])
			this.verticalWalls.push([])
			if (y < this.size.y - 1) this.horizontalWalls.push([])
			for (let x = 0; x < this.size.x; x++) {
				this.tiles[y][x] = undefined
				if (x < this.size.x - 1) this.verticalWalls[y][x] = undefined
				if (y < this.size.y - 1) this.horizontalWalls[y][x] = undefined
			}
		}
	}

	setTile(x, y, type) {
		if (x === typeof Vector) return this.setTile(x.x, x.y, y)
		// x = clamp(x, 0, this.size.x)
		// y = clamp(y, 0, this.size.y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		let tile = new type()
		tile.x = x
		tile.y = y
		this.tiles[y][x] = tile
	}

	getTile(x, y) {
		if (x === typeof Vector) return this.getTile(x.x, x.y)
		// x = clamp(x, 0, this.size.x)
		// y = clamp(y, 0, this.size.y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		return this.tiles[y][x]
	}

	removeTile(x, y) {
		if (x === typeof Vector) return this.deleteTile(x.x, x.y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		this.tiles[y][x] = undefined
	}

	setWall(x, y, orientation, type) {
		if (x === typeof Vector) return this.setTile(x.x, x.y, y, orientation)
		// x = clamp(x, 0, this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0))
		// y = clamp(y, 0, this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0))
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0)) return
		let wall = new type()
		wall.x = x
		wall.y = y
		if (orientation === Orientation.VERTICAL) this.verticalWalls[y][x] = wall
		else if (orientation === Orientation.HORIZONTAL) this.horizontalWalls[y][x] = wall
	}

	getWall(x, y, orientation) {
		if (x === typeof Vector) return this.getWall(x.x, x.y, y)
		// x = clamp(x, 0, this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0))
		// y = clamp(y, 0, this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0))
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0)) return
		if (orientation === Orientation.VERTICAL) return this.verticalWalls[y][x]
		else if (orientation === Orientation.HORIZONTAL) return this.horizontalWalls[y][x]
	}

	removeWall(x, y, orientation) {
		if (x === typeof Vector) return this.deleteWall(x.x, x.y, y)
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0)) return
		if (orientation === Orientation.VERTICAL) this.verticalWalls[y][x] = undefined
		else if (orientation === Orientation.HORIZONTAL) this.horizontalWalls[y][x] = undefined
	}

	render(canvas) {
		let context = canvas.getContext("2d")
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
				if (this.getTile(x, y) !== undefined) {
					context.fillStyle = "#0000ff"
					context.fillRect(x * 100, y * 100, 100, 100)
				}
				if (this.getWall(x, y, Orientation.VERTICAL) !== undefined) {
					context.lineWidth = 10
					context.beginPath()
					context.moveTo(x * 100 + 100, y * 100)
					context.lineTo(x * 100 + 100, y * 100 + 100)
					context.stroke()
				}
				if (this.getWall(x, y, Orientation.HORIZONTAL) !== undefined) {
					context.lineWidth = 10
					context.beginPath()
					context.moveTo(x * 100, y * 100 + 100)
					context.lineTo(x * 100 + 100, y * 100 + 100)
					context.stroke()
				}
			}
		}
	}
}
