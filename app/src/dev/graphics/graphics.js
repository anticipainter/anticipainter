import Display from "./display.js"
import {GameModule} from "../game-module.js"
import Player from "../entity/player.js"
import TileStandard from "../tile/tile-standard.js"
import WallStandard from "../wall/wall-standard.js"
import WallHazard from "../wall/wall-hazard.js"
import RenderLayer from "../util/render-layer.js"

/**
 * The graphics module
 * @class Graphics
 */
export default class Graphics extends GameModule {
	/**
	 * Graphics singleton instance
	 * @private
	 * @type {Graphics}
	 */
	static instance

	/**
	 * Reference to the {@link Display} module
	 * @property display
	 * @type {Display}
	 */
	display
	/**
	 * The wrapper {@link PIXI.Container} for everything
	 * @property wrapper
	 * @type {PIXI.Container}
	 */
	wrapper
	/**
	 * The wrapper {@link PIXI.Container} for the layers
	 * @property sprites
	 * @type {PIXI.Container}
	 */
	sprites
	/**
	 * The object that holds the layer [Containers]{@link PIXI.Container}
	 * @property layers
	 * @type {Map<RenderLayer, PIXI.Container>}
	 */
	layers
	view = $("#game")
	resources

	constructor(game) {
		if (Graphics.instance !== undefined) return

		super(game)
		Graphics.instance = this
		this.display = new Display(this.game)

		this.wrapper = new PIXI.Container()
		this.sprites = new PIXI.Container()
		this.layers = new Map()
		RenderLayer.all().forEach((renderLayer, index) => {
			let layer = new PIXI.Container()
			this.layers.set(renderLayer, layer)
			this.sprites.addChild(layer)
		})

		console.groupCollapsed("Loading progress")
		this.game.app.loader.onProgress.add(this.loadProgressHandler.bind(this))
		this.loadResource(Player)
			.loadResource(TileStandard)
			.loadResource(WallStandard)
			.loadResource(WallHazard)

		this.game.app.loader.load(this.loadFinishHandler.bind(this))
		window.onresize = this.onResize.bind(this)
	}

	/**
	 * Dispatched once per loaded or errored resource
	 * @method loadProgressHandler
	 * @param loader
	 * @param resource
	 */
	loadProgressHandler(loader, resource) {
		console.info("loading: " + resource.url)
		console.info("progress: " + loader.progress.toFixed(1) + "%")
	}

	/**
	 * Dispatched when all resources have been loaded
	 * @method loadProgressHandler
	 * @param loader
	 * @param resources
	 */
	loadFinishHandler(loader, resources) {
		console.groupEnd()
		this.resources = resources

		this.wrapper.addChild(this.sprites)
		this.game.app.stage.addChild(this.wrapper)

		this.game.start()
		this.onResize()
	}

	/**
	 * Loads a sprite resource into memory<br>
	 * Must pass a class type that extends {@link Entity}
	 * @method loadResource
	 * @param {typeof Entity} EntityType
	 * @returns {Anticipainter} game instance for chaining
	 */
	loadResource(EntityType) {
		this.game.app.loader.add(EntityType.getLoadableObject())
		return this
	}

	/**
	 * Called whenever the screen size changes
	 * @method onResize
	 */
	onResize() {
		if (this.game.level === undefined) return
		let size = this.game.level.size
		this.game.app.renderer.resize(this.view.innerWidth(), this.view.innerHeight());
		let width = this.game.app.renderer.width
		let height = this.game.app.renderer.height
		let scale = Math.min(width, height) / 1080 * 16 / Math.max(size.x, size.y)
		this.wrapper.pivot.set(64 * (size.x - 1) / 2, 64 * (size.y - 1) / 2)
		this.wrapper.position.set(width / 2, height / 2)
		this.wrapper.scale.set(scale, scale)
	}

	/**
	 * Gets the texture for an {@link Entity}
	 * @param {Entity} entity
	 * @returns {PIXI.Texture}
	 */
	static getTexture(entity) {
		let resource = Graphics.instance.resources[entity.getRegistryName()]
		return resource.texture
	}

	/**
	 * Adds an {@link Entity} to its corresponding {@link RenderLayer}
	 * @param {Entity} entity
	 */
	static addSprite(entity) {
		if (entity.sprite === undefined) return
		let layer = this.instance.layers.get(entity.constructor.getRenderLayer())
		layer.addChild(entity.sprite)
	}

	/**
	 * Removes an {@link Entity} from its corresponding {@link RenderLayer}
	 * @param {RenderLayer} renderLayer
	 * @param {Entity} entity
	 */
	static removeSprite(renderLayer, entity) {
		if (entity.sprite === undefined) return
		let layer = this.instance.layers.get(entity.constructor.getRenderLayer())
		layer.removeChild(entity.sprite)
	}
}
