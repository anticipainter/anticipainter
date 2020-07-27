import Entity from "./entity.js"
import RenderLayer from "../util/render-layer.js"

export default class Player extends Entity {
	/**
	 * Reference to the {@link Level} instance
	 * @property leve
	 * @type {Level}
	 */
	level

	/**
	 * @constructor
	 * @param {Level} level
	 */
	constructor(level) {
		super();
		this.level = level
	}

	/**
	 * Reference to the current {@link GameMode}
	 * @returns {GameMode}
	 */
	get gameMode() {
		return this.level.gameMode
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
