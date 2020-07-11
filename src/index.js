import {Game} from "./game/game.js";
import {Tile} from "./game/tile/tile.js"
import {Wall} from "./game/wall/wall.js"
import {Orientation} from "./game/util.js"

let game = new Game()
game.render($("#game")[0])
