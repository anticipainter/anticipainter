export class Vector {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	static Add(a, b) {
		return new Vector(a.x + b.x, a.y + b.y);
	}

	static Sub(a, b) {
		return new Vector(a.x - b.x, a.y - b.y);
	}

	static Mul(a, b) {
		return new Vector(a.x * b, a.y * b);
	}

	static Div(a, b) {
		return (b === 0) ? new Vector(a.x / b, a.y / b) : new Vector();
	}

	static Rotate(vector, degrees=90) {
		let rotated = new Vector();
		rotated.x = Math.round(vector.x * Math.cos(degrees * 0.0174533) - vector.y * Math.sin(degrees * 0.0174533));
		rotated.y = Math.round(vector.x * Math.sin(degrees * 0.0174533) + vector.y * Math.cos(degrees * 0.0174533));
		return rotated;
	}

	static FromList(list) {
		return new Vector(list[0], list[1]);
	}

	static ToList(vector) {
		return [vector.x, vector.y];
	}

	static ToString(vector) {
		return `${vector.x}-${vector.y}`;
	}

	static FromDirection(direction) {
		if (direction === "up") {
			return new Vector(0, -1);
		} else if (direction === "down") {
			return new Vector(0, 1);
		} else if (direction === "left") {
			return new Vector(-1, 0);
		} else if (direction === "right") {
			return new Vector(1, 0);
		}
	}
}