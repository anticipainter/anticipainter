/**
 * Gets the piecewise value of two lines passing though `(0, 0)`, `(x, y)`, and `(1, 1)`
 * @param {number} x
 * @param {number} y
 * @param {number} t
 * @returns {number} the point `t` along the x-axis
 */
export function piecewise(x, y, t) {
	if (t < x) return t * y / x
	return (1 - y) * (t - x) / (1 - x) + y
}
