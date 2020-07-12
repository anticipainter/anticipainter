import {Vector} from "./vector.js"
import {clamp, Orientation} from "./util.js"
import {Default} from "./tile/default.js"
import {Tracer} from "./tile/tracer.js"
import {Game} from "./game.js"

export class Grid {
	constructor(width = 0, height = 0) {
		this.size = new Vector(width, height)
		this.tiles = []
		this.verticalWalls = []
		this.horizontalWalls = []
		for (let y = 0; y <= this.size.y; y++) {
			if (y < this.size.y) {
				this.tiles.push([])
				this.verticalWalls.push([])
			}
			this.horizontalWalls.push([])
			for (let x = 0; x <= this.size.x; x++) {
				if (x < this.size.x && y < this.size.y) this.tiles[y][x] = undefined
				if (x < this.size.x) this.horizontalWalls[y][x] = undefined
				if (y < this.size.y) this.verticalWalls[y][x] = undefined
			}
		}
	}

	setTile(x, y, tile) {
		if (x instanceof Vector) return this.setTile(x.x, x.y, y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		tile.position.x = x
		tile.position.y = y
		this.tiles[y][x] = tile
	}

	getTile(x, y) {
		if (x instanceof Vector) return this.getTile(x.x, x.y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		return this.tiles[y][x]
	}

	removeTile(x, y) {
		if (x instanceof Vector) return this.removeTile(x.x, x.y)
		if (x < 0 || x >= this.size.x) return
		if (y < 0 || y >= this.size.y) return
		this.tiles[y][x] = undefined
	}

	forEachTile(func) {
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
				if (this.tiles[y][x] !== undefined) func(this.tiles[y][x])
			}
		}
	}

	setWall(x, y, orientation, wall) {
		if (x instanceof Vector) return this.setWall(x.x, x.y, y, orientation)
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? 1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? 1 : 0)) return
		if (orientation === Orientation.VERTICAL) {
			this.tryRemoveWallSprite(this.verticalWalls, x, y)
			this.verticalWalls[y][x] = wall
		} else if (orientation === Orientation.HORIZONTAL) {
			this.tryRemoveWallSprite(this.horizontalWalls, x, y)
			this.horizontalWalls[y][x] = wall
		}
		wall.position.x = x
		wall.position.y = y
		wall.orientation = orientation
	}

	tryRemoveWallSprite(walls, x, y) {
		if (walls[y][x] === undefined) return
		let wall = walls[y][x]
		if (wall.sprite !== undefined) {
			wall.removeFromGameList()
			wall.sprite = undefined
		}
		walls[y][x] = undefined
	}

	getWall(x, y, orientation) {
		if (x instanceof Vector) return this.getWall(x.x, x.y, y)
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? 1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? 1 : 0)) return
		if (orientation === Orientation.VERTICAL) return this.verticalWalls[y][x]
		else if (orientation === Orientation.HORIZONTAL) return this.horizontalWalls[y][x]
	}

	removeWall(x, y, orientation) {
		if (x instanceof Vector) return this.removeWall(x.x, x.y, y)
		if (x < 0 || x >= this.size.x + (orientation === Orientation.VERTICAL ? 1 : 0)) return
		if (y < 0 || y >= this.size.y + (orientation === Orientation.HORIZONTAL ? 1 : 0)) return
		if (orientation === Orientation.VERTICAL) {
			this.verticalWalls[y][x].removeFromGameList()
			this.verticalWalls[y][x].sprite = undefined
			this.verticalWalls[y][x] = undefined
		}
		else if (orientation === Orientation.HORIZONTAL) {
			this.horizontalWalls[y][x].removeFromGameList()
			this.horizontalWalls[y][x].sprite = undefined
			this.horizontalWalls[y][x] = undefined
		}
	}

	forEachWallHorizontal(func) {
		for (let y = 0; y < this.size.y + 1; y++) {
			for (let x = 0; x < this.size.x; x++) {
				if (this.horizontalWalls[y][x] !== undefined) func(this.horizontalWalls[y][x])
			}
		}
	}

	forEachWallVertical(func) {
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x + 1; x++) {
				if (this.verticalWalls[y][x] !== undefined) func(this.verticalWalls[y][x])
			}
		}
	}

	forEachWall(func) {
		this.forEachWallHorizontal(func)
		this.forEachWallVertical(func)
	}

	render(context) {
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
				if (this.getTile(x, y) instanceof Tracer) {
					context.fillStyle = "#00ff00"
					context.fillRect(x * 100, y * 100, 100, 100)
				} else if (this.getTile(x, y) instanceof Default) {
					context.fillStyle = "#0000ff"
					context.fillRect(x * 100, y * 100, 100, 100)
				}
			}
		}
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
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
