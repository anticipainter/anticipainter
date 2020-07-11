import {Player} from "./player.js";
import {Grid} from "./grid.js";

export class Game {
	player = new Player()
	grid = new Grid(3, 5)

	constructor() {
		console.log($("#game"))
	}

	render(canvas) {
		this.grid.render(canvas)
	}
}
