/**
 * @callback VectorCallback
 * @param {Vector} vector
 */

/**
 * 2d vector object
 * @property {number} x - The x component
 * @property {number} y - The y component
 */
export default class Vector {
	// region Properties
	/**
	 * The x component of the {@link Vector}
	 * @type {number}
	 */
	x
	/**
	 * The y component of the {@link Vector}
	 * @type {number}
	 */
	y
	// endregion

	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Iterate over the {@link Vector} at each integer
	 * @method iterate
	 * @param {VectorCallback} callback - function to call at each step
	 */
	iterate(callback) {
		Vector.iterate(new Vector(), this, callback)
	}

	/**
	 * Returns a new {@link Vector} with both dimensions the nearest integers
	 * @method getRounded
	 * @returns {Vector}
	 */
	getRounded() {
		return new Vector(Math.round(this.x), Math.round(this.y))
	}

	/**
	 * Gets the string representation of this {@link Vector}
	 * @method
	 * @returns {string}
	 */
	toString() {
		return Vector.toString(this)
	}

	/**
	 * Linearly interpolates between two [Vectors]{@link Vector} by a percentage
	 * @method lerp
	 * @param {Vector} a - starting point
	 * @param {Vector} b - ending point
	 * @param {number} t - percentage between the two
	 * @returns {Vector} `t` percent between `a` and `b`
	 */
	static lerp(a, b, t) {
		return Vector.add(a, Vector.mul(Vector.sub(b, a), t))
	}

	/**
	 * Iterate between two [Vectors]{@link Vector} stopping at each integer
	 * @method iterate
	 * @param {Vector} a - starting point
	 * @param {Vector} b - ending point
	 * @param {VectorCallback} callback - function to call at each step
	 */
	static iterate(a, b, callback) {
		for (let y = a.y; y < b.y; y++) {
			for (let x = a.x; x < b.x; x++) callback(new Vector(x, y))
		}
	}

	/**
	 * Rotates a {@link Vector} by an angle in degrees
	 * @method rotate
	 * @param {Vector} vector - original vector
	 * @param {number} degrees - how far to rotate
	 * @returns {Vector} the new rotated {@link Vector}
	 */
	static rotate(vector, degrees=90) {
		let rotated = new Vector();
		rotated.x = Math.round(vector.x * Math.cos(degrees * 0.0174533) - vector.y * Math.sin(degrees * 0.0174533));
		rotated.y = Math.round(vector.x * Math.sin(degrees * 0.0174533) + vector.y * Math.cos(degrees * 0.0174533));
		return rotated;
	}

	/**
	 * Gets the sum of two [Vectors]{@link Vector}
	 * @method add
	 * @param {Vector} a - addend vector
	 * @param {Vector} b - augend vector
	 * @returns {Vector} `a + b`
	 */
	static add(a, b) {
		return new Vector(a.x + b.x, a.y + b.y);
	}

	/**
	 * Gets the difference of two [Vectors]{@link Vector}
	 * @method sub
	 * @param {Vector} a - minuend vector
	 * @param {Vector} b - subtrahend vector
	 * @returns {Vector} `a - b`
	 */
	static sub(a, b) {
		return new Vector(a.x - b.x, a.y - b.y);
	}

	/**
	 * Scales a {@link Vector} by a scalar
	 * @method mul
	 * @param {Vector} a - multiplicand
	 * @param {number} b - multiplier
	 * @returns {Vector} `a * b`
	 */
	static mul(a, b) {
		return new Vector(a.x * b, a.y * b);
	}

	/**
	 * Inversely scales a {@link Vector} by a scalar or returns the zero {@link Vector} if dividing by 0
	 * @method div
	 * @param {Vector} a - dividend
	 * @param {number} b - divisor
	 * @returns {Vector} `a / b`
	 */
	static div(a, b) {
		return (b === 0) ? new Vector(a.x / b, a.y / b) : new Vector();
	}

	/**
	 * Negates a {@link Vector}
	 * @method neg
	 * @param {Vector} vector
	 * @returns {Vector} `-a`
	 */
	static neg(vector) {
		return new Vector(-vector.x, -vector.y)
	}

	/**
	 * Returns a new {@link Vector} containing the minimum dimensions of `a` and `b`
	 * @method min
	 * @param {Vector} a
	 * @param {Vector} b
	 * @returns {Vector|undefined}
	 */
	static min(a, b) {
		if (a === undefined) return b
		if (b === undefined) return a
		return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y))
	}

	/**
	 * Returns a new {@link Vector} containing the maximum dimensions of `a` and `b`
	 * @method max
	 * @param {Vector} a
	 * @param {Vector} b
	 * @returns {Vector|undefined}
	 */
	static max(a, b) {
		if (a === undefined) return b
		if (b === undefined) return a
		return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y))
	}

	/**
	 * If both [Vectors]{@link Vector} are equal
	 * @method equals
	 * @param {Vector} a - left vector
	 * @param {Vector} b - right vector
	 * @returns {boolean} `a == b`
	 */
	static equals(a, b) {
		return a.x === b.x && a.y === b.y
	}

	/**
	 * Gets the string representation of the {@link Vector}
	 * @method
	 * @param vector
	 * @returns {string}
	 */
	static toString(vector) {
		return `(${vector.x}, ${vector.y})`;
	}

	/**
	 * Returns a new zero {@link Vector}<br>`return new Vector(0, 0)`
	 * @method zero
	 * @returns {Vector}
	 */
	static get zero() {
		return new Vector(0, 0)
	}

	/**
	 * Returns a new one {@link Vector}<br>`return new Vector(1, 1)`
	 * @method one
	 * @returns {Vector}
	 */
	static get one() {
		return new Vector(1, 1)
	}

	/**
	 * Returns a new left {@link Vector}<br>`return new Vector(-1, 0)`
	 * @method left
	 * @returns {Vector}
	 */
	static get left() {
		return new Vector(-1, 0)
	}

	/**
	 * Returns a new right {@link Vector}<br>`return new Vector(1, 0)`
	 * @method right
	 * @returns {Vector}
	 */
	static get right() {
		return new Vector(1, 0)
	}

	/**
	 * Returns a new up {@link Vector}<br>`return new Vector(0, -1)`
	 * @method up
	 * @returns {Vector}
	 */
	static get up() {
		return new Vector(0, -1)
	}

	/**
	 * Returns a new down {@link Vector}<br>`return new Vector(0, 1)`
	 * @method down
	 * @returns {Vector}
	 */
	static get down() {
		return new Vector(0, 1)
	}

	/**
	 * Converts a list to a {@link Vector}
	 * @method
	 * @param {number[]} list - list of length 2
	 * @returns {Vector}
	 */
	static fromList(list) {
		return new Vector(list[0], list[1]);
	}

	/**
	 * Converts a {@link Vector} to a list
	 * @method
	 * @param {Vector} vector
	 * @returns {number[]} list of length 2
	 */
	static toList(vector) {
		return [vector.x, vector.y];
	}
}
