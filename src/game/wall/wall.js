import {Entity} from "../entity.js";
import {Orientation} from "../util.js";

export class Wall extends Entity {
	orientation = Orientation.HORIZONTAL

	constructor() {
		super()
	}
}
