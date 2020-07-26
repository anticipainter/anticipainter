import Level from "../level.js"
import TileStandard from "../../tile/tile-standard.js"
import Vector from "../../util/vector.js"

/**
 * The tutorial level
 */
export default class Level0 extends Level {
	get name() {
		return "Tutorial"
	}

	generateStage(builder) {
		builder.queueRect(TileStandard, new Vector(0, 0), new Vector(8, 8))
		builder.clearRect(new Vector(3, 3), new Vector(5, 5))
	}
}
