import Vector from "../../util/vector.js"
import Level from "../level.js"
import TileStandard from "../../tile/tile-standard.js"
import WaveStandard from "../../wave/wave-standard.js"

/**
 * Level 1
 */
export default class Level1 extends Level {
	get name() {
		return "Level 1"
	}

	generateStage(builder) {
		builder.queueRect(TileStandard, new Vector(0, 0), new Vector(8, 8))
		builder.clearRect(new Vector(2, 2), new Vector(6, 6))
		builder.queueRect(TileStandard, new Vector(3, 3), new Vector(5, 5))
		builder.queueRect(TileStandard, new Vector(0, 4), new Vector(8, 4))
	}

	generateWaves(builder) {
		builder.add(0.2, new WaveStandard(0, 5000, 4, 250))
	}
}
