import {Grid} from "./grid.js";
import {Orientation} from "./util.js";
import {Wall} from "./wall/wall.js";

export class Generator {
    constructor(grid) {
        this.grid = grid
    }

    generate() {
        this.grid.setWall(0, 0, Orientation.VERTICAL, Wall)
    }
}
