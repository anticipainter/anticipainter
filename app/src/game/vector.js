/**
 * @callback VectorCallback
 * @param {Vector} vector
 */

export class Vector {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Iterate over the vector at each integer
	 * @param {VectorCallback} callback
	 */
	iterate(callback) {
		Vector.iterate(new Vector(), this, callback)
	}

	static zero() {
		return new Vector(0, 0)
	}

	static one() {
		return new Vector(1, 1)
	}

	getRounded() {
		return new Vector(Math.round(this.x), Math.round(this.y))
	}

	static equals(a, b) {
		return a.x == b.x && a.y == b.y
	}

	static add(a, b) {
		return new Vector(a.x + b.x, a.y + b.y);
	}

	static sub(a, b) {
		return new Vector(a.x - b.x, a.y - b.y);
	}

	static mul(a, b) {
		return new Vector(a.x * b, a.y * b);
	}

	static div(a, b) {
		return (b === 0) ? new Vector(a.x / b, a.y / b) : new Vector();
	}

	static neg(a) {
		return new Vector(-a.x, -a.y)
	}

	static lerp(a, b, t) {
		return Vector.add(a, Vector.mul(Vector.sub(b, a), t))
	}

	static rotate(vector, degrees=90) {
		let rotated = new Vector();
		rotated.x = Math.round(vector.x * Math.cos(degrees * 0.0174533) - vector.y * Math.sin(degrees * 0.0174533));
		rotated.y = Math.round(vector.x * Math.sin(degrees * 0.0174533) + vector.y * Math.cos(degrees * 0.0174533));
		return rotated;
	}

	static min(a, b) {
		if (a === undefined) return b
		if (b === undefined) return a
		return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y))
	}

	static max(a, b) {
		if (a === undefined) return b
		if (b === undefined) return a
		return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y))
	}

	/**
	 * Iterate over two vectors stopping at each integer
	 * @param {Vector} a
	 * @param {Vector} b
	 * @param {VectorCallback} callback
	 */
	static iterate(a, b, callback) {
		for (let y = a.y; y < b.y; y++) {
			for (let x = a.x; x < b.x; x++) {
				callback(new Vector(x, y))
			}
		}
	}

	static fromList(list) {
		return new Vector(list[0], list[1]);
	}

	static toList(vector) {
		return [vector.x, vector.y];
	}

	static toString(vector) {
		return `${vector.x}-${vector.y}`;
	}
}
