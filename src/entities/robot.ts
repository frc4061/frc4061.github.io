import {
	__fieldSize__,
	__friction__,
	__blinkThreshold__,
	__maxTurn__,
	__turnMultiplier__,
	__turnSpring__,
	__blinkSpeed__
} from "../lib/constants";
import { getFrame } from "../lib/utils";
import { Vector } from "../lib/vector";

export class Robot {
	private pos: Vector;
	private speed: number;
	private angle: number;
	private wheelAngle: number;
	private ctx: CanvasRenderingContext2D;
	private cam: Vector;

	public constructor(ctx: CanvasRenderingContext2D, cam: Vector) {
		this.pos = Vector.ZERO;
		this.speed = 0;
		this.angle = 0;
		this.wheelAngle = 0;
		this.ctx = ctx;
		this.cam = cam;
	}

	public turn(angle: number) {
		this.wheelAngle += angle;
		if (this.wheelAngle > __maxTurn__) this.wheelAngle = __maxTurn__;
		else if (this.wheelAngle < -__maxTurn__) this.wheelAngle = -__maxTurn__;
	}

	public accelerate(amount: number) {
		this.speed += amount;
	}

	public getPosition() {
		return this.pos;
	}

	public update() {
		this.pos.x += this.speed * Math.cos(this.angle);
		this.pos.y += this.speed * Math.sin(this.angle);

		this.angle += this.wheelAngle * this.speed * __turnMultiplier__;
		this.wheelAngle *= __turnSpring__;

		this.speed *= __friction__;

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

		this.ctx.translate(
			Math.round(this.pos.x - this.cam.x),
			Math.round(this.pos.y - this.cam.y)
		);
		this.ctx.rotate(this.angle);

		this.ctx.translate(12, -20);
		this.ctx.rotate(this.wheelAngle);
		this.ctx.moveTo(-8, 0);
		this.ctx.lineTo(8, 0);
		this.ctx.rotate(-this.wheelAngle);

		this.ctx.translate(0, 40);

		this.ctx.rotate(this.wheelAngle);
		this.ctx.moveTo(-8, 0);
		this.ctx.lineTo(8, 0);
		this.ctx.rotate(-this.wheelAngle);
		this.ctx.translate(-12, -20);

		this.ctx.moveTo(-20, -20);
		this.ctx.lineTo(-4, -20);

		this.ctx.moveTo(-20, 20);
		this.ctx.lineTo(-4, 20);

		this.ctx.fillRect(-20, -15, 40, 30);
		this.ctx.strokeRect(-20, -15, 40, 30);

		this.ctx.moveTo(5, 0);
		this.ctx.ellipse(0, 0, 5, 5, 0, 0, Math.PI * 2);
		this.ctx.fillStyle = ["#440000", "#ff0000"][
			Math.abs(this.speed) < __blinkThreshold__
				? 0
				: getFrame(__blinkSpeed__, 2)
		];
		this.ctx.fill();
		this.ctx.stroke();

		this.ctx.rotate(-this.angle);
		this.ctx.translate(
			-Math.round(this.pos.x - this.cam.x),
			-Math.round(this.pos.y - this.cam.y)
		);
	}
}
