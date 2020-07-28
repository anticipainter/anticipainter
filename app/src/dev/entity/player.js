import Entity from "./entity.js"
import RenderLayer from "../util/render-layer.js"
import Graphics from "../graphics/graphics.js";
import Direction from "../util/direction.js";

export default class Player extends Entity {
	// region Properties
	/**
	 * Reference to the {@link Level} instance
	 * @property leve
	 * @type {Level}
	 */
	level
	/**
	 * The {@link Player}'s different eye visuals
	 * @property eyes
	 * @type {{
	 *  parent: PIXI.Container,
	 *  norm: PIXI.Sprite,
	 *  exec: PIXI.Sprite,
	 *  dead: PIXI.Sprite
	 * }}
	 */
	eyes
	/**
	 * The {@link Player}'s facing direction
	 * @property facing
	 * @type {Direction}
	 */
	facing
	// endregion

	/**
	 * @constructor
	 * @param {Level} level
	 */
	constructor(level) {
		super();
		this.level = level
		this.eyes = {}
	}

	/**
	 * Causes the {@link Player} to blink once
	 */
	blink() {
		this.animate("blink", 400, now => {
			let stop = 0.4
			let value = (now <= stop) ? now / stop :
				(now > stop && now <= 1 - stop) ? 1 : (1 - now) / stop
			this.eyes.parent.alpha = 1 - value
		})
	}

	/**
	 * Reference to the current {@link GameMode}
	 * @returns {GameMode}
	 */
	get gameMode() {
		return this.level.gameMode
	}

	onSpriteCreated() {
		this.eyes = {
			parent: new PIXI.Container(),
			norm: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_norm")),
			exec: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_exec")),
			dead: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_dead"))
		}
		this.eyes.norm.anchor.set(0.5, 0.5)
		this.eyes.exec.anchor.set(0.5, 0.5)
		this.eyes.dead.anchor.set(0.5, 0.5)
		this.eyes.exec.alpha = 0
		this.eyes.dead.alpha = 0
		this.eyes.parent.addChild(this.eyes.norm)
		this.eyes.parent.addChild(this.eyes.exec)
		this.eyes.parent.addChild(this.eyes.dead)
		this.sprite.addChild(this.eyes.parent)
		this.sprite.alpha = 0
		this.sprite.scale.set(0)
		setTimeout(() => {
			let angle = Direction.toAngle(this.facing), dir = Math.random() < 0.5 ? -1 : 1
			// Fade and scale the Player in
			this.animate("fadeIn", 500, now => {
				this.sprite.scale.set(now * 64 / 1000)
				this.sprite.alpha = now
			}, () => {
				this.sprite.scale.set(64 / 1000)
				this.sprite.alpha = 1
			})
			// Rotate eyes into the correct direction
			this.animate("spinEyes", 1000, now => {
				this.eyes.parent.angle = angle + dir * (1 - now) * 360
			}, () => {
				this.eyes.parent.angle = angle
				this.blink()
			})
		}, 0)
		setInterval(this.blink.bind(this), 6000)
	}

	// region Registry methods

	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "../../res/drawable/player.svg"
	}

	static getLoadableObject() {
		return [
			{name: Player.getRegistryName(), url: Player.getResourcePath()},
			{name: "player_eyes_norm", url: "../../res/drawable/player_eyes_norm.svg"},
			{name: "player_eyes_exec", url: "../../res/drawable/player_eyes_exec.svg"},
			{name: "player_eyes_dead", url: "../../res/drawable/player_eyes_dead.svg"}
		]
	}

	// endregion

	static getRenderLayer() {
		return RenderLayer.PLAYER
	}
}
