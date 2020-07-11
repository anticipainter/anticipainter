import {Player} from "./player.js"
import {Tile} from "./tile/tile.js"
import {Wall} from "./wall/wall.js"
import {Vector} from "./vector.js"
import {Grid} from "./grid.js"
import {Generator} from "./generator.js"
import {Direction, Orientation} from "./util.js"

export class Game {
	static sprites = new PIXI.Container()
	static resources = {}
	static entities = []

	static size = new Vector(9, 9)

	constructor(app) {
		this.app = app

		this.app.loader.on("progress", this.loadProgressHandler)
		this.loadResource(Player)
			.loadResource(Tile)
			.loadResource(Wall)

		this.onResize()

		let game = this
		this.app.loader.load((loader, resources) => { game.start(loader, resources) })
		window.onresize = function() { game.onResize() }
	}

	start(loader, resources) {
		Game.resources = resources

		// this.test()
		this.grid = new Grid(Game.size.x, Game.size.y)
		this.generator = new Generator(this.grid)
		this.generator.generate()
		this.player = new Player()

		this.grid.forEachTile(function (tile) {
			tile.start()
		})
		this.grid.forEachWall(function (wall) {
			wall.start()
		})
		this.player.start()

		this.app.stage.addChild(Game.sprites)
		this.app.ticker.add(this.update)
	}

	test() {
		for (let y = 0; y < Game.size.y; y++) {
			for (let x = 0; x < Game.size.x; x++) {
				let tile = new Wall()
				tile.position.x = x;
				tile.position.y = y;
				if ((x + y) % 2 === 0) tile.setOrientation(Orientation.VERTICAL)
			}
		}
	}

	update() {
		for (let entity of Game.entities) {
			entity.update()
		}
	}

	loadResource(type) {
		/* if (type instanceof Entity) */ this.app.loader.add(type.getLoadableObject())
		return this
	}

	loadProgressHandler(loader, resource) {
		console.log("loading: " + resource.url)
		console.log("progress: " + loader.progress.toFixed(1) + "%")
	}

	onResize() {
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
		Game.sprites.pivot.set(64 * Game.size.x / 2, 64 * Game.size.y / 2)
		Game.sprites.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2)
	}

	keyPress(key) {
		if ([65, 37].includes(key)) this.player.queueMove(Direction.LEFT)
		else if ([68, 39].includes(key)) this.player.queueMove(Direction.RIGHT)
		else if ([87, 38].includes(key)) this.player.queueMove(Direction.UP)
		else if ([83, 40].includes(key)) this.player.queueMove(Direction.DOWN)
	}

	render() {

	}
}
