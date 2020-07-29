import GameModule from "../game-module.js";

export default class Controls extends GameModule {
	static MOVE_LEFT = [37, 65]
	static MOVE_RIGHT = [39, 68]
	static MOVE_UP = [38, 87]
	static MOVE_DOWN = [40, 83]
}