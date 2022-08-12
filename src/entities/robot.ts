import {
	__fieldSize__,
	__friction__,
	__maxTurn__,
	__turnMultiplier__,
	__turnSpring__
} from "../lib/constants";
import { Vector } from "../lib/vector";

export class Robot {
	private pos: Vector;
	private angle: number;
	private wheelAngle: number;
	private vel: number;
	private ctx: CanvasRenderingContext2D;
	private cam: Vector;

	public constructor(ctx: CanvasRenderingContext2D, cam: Vector) {
		this.pos = Vector.ZERO;
		this.angle = 0;
		this.wheelAngle = 0;
		this.vel = 0;
		this.ctx = ctx;
		this.cam = cam;
	}

	public turn(angle: number) {
		this.wheelAngle += angle;
		if (this.wheelAngle > __maxTurn__) this.wheelAngle = __maxTurn__;
		else if (this.wheelAngle < -__maxTurn__) this.wheelAngle = -__maxTurn__;
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

		this.wheelAngle *= __turnSpring__;
		this.angle += this.wheelAngle * this.vel * __turnMultiplier__;

		this.vel *= __friction__;

		if (this.pos.x > __fieldSize__.x / 2) this.pos.x = __fieldSize__.x / 2;
		else if (this.pos.x < -__fieldSize__.x / 2)
			this.pos.x = -__fieldSize__.x / 2;
		if (this.pos.y > __fieldSize__.y / 2) this.pos.y = __fieldSize__.y / 2;
		else if (this.pos.y < -__fieldSize__.y / 2)
			this.pos.y = -__fieldSize__.y / 2;
	}

	public draw() {
		this.ctx.beginPath();

		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle = "#000000";
		this.ctx.lineJoin = "bevel";
		this.ctx.fillStyle = "#aaaaaa";

		this.ctx.translate(this.pos.x - this.cam.x, this.pos.y - this.cam.y);
		this.ctx.rotate(this.angle);

		this.ctx.translate(12, -20);
		this.ctx.rotate(this.wheelAngle);
		this.ctx.moveTo(-8, 0);
		this.ctx.lineTo(8, 0);
		this.ctx.rotate(-this.wheelAngle);
		this.ctx.translate(-12, 20);

		this.ctx.translate(12, 20);
		this.ctx.rotate(this.wheelAngle);
		this.ctx.moveTo(-8, 0);
		this.ctx.lineTo(8, 0);
		this.ctx.rotate(-this.wheelAngle);
		this.ctx.translate(-12, -20);

		this.ctx.moveTo(-20, -20);
		this.ctx.lineTo(-4, -20);

		this.ctx.moveTo(-20, 20);
		this.ctx.lineTo(-4, 20);

		this.ctx.stroke();
		this.ctx.fillRect(-20, -15, 40, 30);
		this.ctx.strokeRect(-20, -15, 40, 30);
		this.ctx.rotate(-this.angle);
		this.ctx.translate(-this.pos.x + this.cam.x, -this.pos.y + this.cam.y);
	}
}
