import { __friction__ } from "./lib/constants";
import { Vector2 } from "./lib/types";

export class Robot {
	private pos: Vector2;
	private angle: number;
	private vel: number;
	private ctx: CanvasRenderingContext2D;

	public constructor(ctx: CanvasRenderingContext2D) {
		this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		this.angle = 0;
		this.vel = 0;
		this.ctx = ctx;
	}

	public rotate(angle: number) {
		this.angle += angle;
	}

	public accelerate(amount: number) {
		this.vel += amount;
	}

	public getPosition() {
		return this.pos;
	}

	public update() {
		this.pos.x += Math.cos(this.angle) * this.vel;
		this.pos.y += Math.sin(this.angle) * this.vel;

		this.vel *= __friction__;
	}

	public draw() {
		this.ctx.translate(this.pos.x, this.pos.y);
		this.ctx.rotate(this.angle);
		this.ctx.strokeRect(-20, -15, 40, 30);
		this.ctx.rotate(-this.angle);
		this.ctx.translate(-this.pos.x, -this.pos.y);
	}
}
