import Vector from "../lib/vector";
import Robot from "./robot";

export default class ImageEntity {
	private pos: Vector;

	private content: HTMLImageElement;

	private scale: number;

	private ctx: CanvasRenderingContext2D;

	private cam: Vector;

	private robot: Robot;

	private size: Vector;

	public constructor(
		pos: Vector,
		src: string,
		scale: number,
		ctx: CanvasRenderingContext2D,
		cam: Vector,
		robot: Robot
	) {
		this.pos = pos;
		this.content = new Image();
		this.content.src = `assets/${src}`;
		this.scale = scale;
		this.ctx = ctx;
		this.cam = cam;
		this.robot = robot;

		this.size = Vector.ZERO;
		this.content.onload = () => {
			this.size = new Vector(
				this.content.width * this.scale,
				this.content.height * this.scale
			);
		};
	}

	public draw() {
		const pos = this.robot.getPosition();
		const { bounds } = this;
		this.ctx.globalAlpha =
			pos.y > bounds.top &&
			pos.y < bounds.bottom &&
			pos.x > bounds.left &&
			pos.x < bounds.right
				? 0.8
				: 0.5;

		this.ctx.drawImage(
			this.content,
			0,
			0,
			this.content.width,
			this.content.height,
			this.pos.x - this.cam.x - this.size.x / 2,
			this.pos.y - this.cam.y - this.size.y / 2,
			this.content.width * this.scale,
			this.content.height * this.scale
		);

		this.ctx.globalAlpha = 1;
	}

	public get bounds() {
		return {
			top: this.pos.y - this.size.y / 2,
			bottom: this.pos.y + this.size.y / 2,
			left: this.pos.x - this.size.x / 2,
			right: this.pos.x + this.size.x / 2
		};
	}
}
