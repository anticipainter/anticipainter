import {Player} from "./player.js";
import {Grid} from "./grid.js";
import {Generator} from "./generator.js";

export class Game {
	player = new Player()
	grid = new Grid(3, 5)

	constructor() {
		console.log($("#game"))
		this.generator = new Generator(this.grid)
		this.generator.generate()
	}

	render(canvas) {
		this.grid.render(canvas)
	}
}
