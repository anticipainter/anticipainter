import Level from "./level.js"
import {Vector} from "../vector.js"
import {Tile} from "../tile/tile.js"

export default class Level1 extends Level {
	constructor() {
		super("Level 1")
		console.log(this.getStartLocation())
	}

	generateStage(builder) {
		builder.queueRect(Tile, new Vector(0, 0), new Vector(8, 8))
		builder.clearRect(new Vector(2, 2), new Vector(6, 6))
		builder.queueRect(Tile, new Vector(3, 3), new Vector(5, 5))
		builder.queueRect(Tile, new Vector(0, 4), new Vector(8, 4))
	}

	print() {
		let s = ""
		for (let y = 0; y <= this.stage.size.y; y++) {
			for (let x = 0; x <= this.stage.size.x; x++) {
				if (this.stage.getTile(new Vector(x, y)) !== undefined) s += 'T'
				else s += ' '
			}
			s += '\n'
		}
		console.log(s)
	}
}
