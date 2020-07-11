import {Vector} from "./vector.js"

export function clamp(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), maximum)
}

let i = 0

export const Direction = {
	LEFT: i++,
	RIGHT: i++,
	UP: i++,
	DOWN: i++,
	inverse(direction) {
		if (direction === this.LEFT) return this.RIGHT
		if (direction === this.RIGHT) return this.LEFT
		if (direction === this.UP) return this.DOWN
		if (direction === this.DOWN) return this.UP
	},
	leftOf(direction) {
		if (direction === this.LEFT) return this.DOWN
		if (direction === this.RIGHT) return this.UP
		if (direction === this.UP) return this.LEFT
		if (direction === this.DOWN) return this.RIGHT
	},
	rightOf(direction) {
		if (direction === this.LEFT) return this.UP
		if (direction === this.RIGHT) return this.DOWN
		if (direction === this.UP) return this.RIGHT
		if (direction === this.DOWN) return this.LEFT
	},
	toVector(direction) {
		if (direction === this.LEFT) return new Vector(-1, 0)
		if (direction === this.RIGHT) return new Vector(1, 0)
		if (direction === this.UP) return new Vector(0, -1)
		if (direction === this.DOWN) return new Vector(0, 1)
	},
	all() {
		return [this.LEFT, this.RIGHT, this.UP, this.DOWN]
	},
	random() {
		return this.all()[Math.floor(Math.random() * 4)]
	}
}

export const Orientation = {
	HORIZONTAL: i++,
	VERTICAL: i++,
	flip(orientation) {
		if (orientation === this.HORIZONTAL) return this.VERTICAL
		if (orientation === this.VERTICAL) return this.HORIZONTAL
	},
	all() {
		return [this.HORIZONTAL, this.VERTICAL]
	},
	random() {
		return this.all()[Math.floor(Math.random() * 2)]
	}
}
