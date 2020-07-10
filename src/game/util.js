export function clamp(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), maximum)
}

let i = 0
export const Direction = { UP: i++, DOWN: i++, LEFT: i++, RIGHT: i++ }
export const Orientation = { HORIZONTAL: i++, VERTICAL: i++ }
