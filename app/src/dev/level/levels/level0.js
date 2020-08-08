import Level from "../level.js"
import TileStandard from "../../tile/tile-standard.js"
import Vector from "../../util/vector.js"
import WaveStandard from "../../wave/wave-standard.js";

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

	generateWaves(builder) {
		builder.add(0.2, new WaveStandard(0, 5000, 4, 250))
	}
}
