export class Vector {
	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public static get ZERO() {
		return new Vector(0, 0);
	}
}
