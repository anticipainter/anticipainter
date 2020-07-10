import {Vector} from "./vector.js";

export class Game {
	vector = new Vector()

	constructor() {
		console.log($("#test"))
	}

	toString() {
		return this.vector
	}
}
