import EventBus from "./event/eventbus.js"
import Graphics from "./graphics/graphics.js"
import Level0 from "./level/levels/level0.js"
import Level1 from "./level/levels/level1.js"

const levels = [Level0, Level1]

/**
 * The main Anticipainter class
 * @class
 */
export default class Anticipainter {
	// region Properties
	/**
	 * Reference to the {@link PIXI.Application} instance
	 * @property app
	 * @type {PIXI.Application}
	 */
	app
	/**
	 * Reference to the {@link EventBus} module
	 * @property eventBus
	 * @type {EventBus}
	 */
	eventBus
	/**
	 * Reference to the {@link Graphics} module
	 * @property graphics
	 * @type {Graphics}
	 */
	graphics
	/**
	 * Reference to the {@link Level} instance
	 * @property level
	 * @type {Level}
	 */
	level
	/**
	 * The index of the {@link Level}
	 * @property levelIndex
	 * @type {number}
	 */
	levelIndex
	/**
	 * Set of all the [Entities]{@link Entity} currently active
	 * @property entities
	 * @type {Set<Entity>}
	 */
	entities
	// endregion

	constructor(app, levelIndex) {
		this.app = app
		this.levelIndex = levelIndex
		this.eventBus = new EventBus(this)
		this.graphics = new Graphics(this)
		this.entities = new Set()
	}

	start() {
		if (this.levelIndex === undefined) return
		this.level = new levels[this.levelIndex]()
		this.level.stage.forEachTile(tile => {
			this.entities.add(tile)
			tile.createSprite()
			Graphics.addSprite(tile)
		})
		this.level.stage.forEachWall(wall => {
			this.entities.add(wall)
			wall.createSprite()
			Graphics.addSprite(wall)
		})
	}
}
