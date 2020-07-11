import {Game} from "./game/game.js";
import {Tile} from "./game/tile/tile.js"
import {Wall} from "./game/wall/wall.js"
import {Orientation} from "./game/util.js"

let game = new Game()
// game.grid.setTile(0, 0, Tile)
// game.grid.setWall(0, 0, Orientation.VERTICAL, Wall)
// game.grid.setWall(0, 0, Orientation.HORIZONTAL, Wall)
console.log(game)
game.render($("#game")[0])
