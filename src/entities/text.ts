import Vector from "../lib/vector";
import Robot from "./robot";

export default class Text {
	private pos: Vector;

	private content: string;

	private fontSize: number;

	private hover: boolean;

	private color: string;

	private ctx: CanvasRenderingContext2D;

	private cam: Vector;

	protected robot: Robot;

	private size: Vector;

	public constructor(
		pos: Vector,
		content: string,
		fontSize: number,
		ctx: CanvasRenderingContext2D,
		cam: Vector,
		robot: Robot,
		hover: boolean = true,
		color: string = "#1358bf"
	) {
		this.pos = pos;
		this.content = content;
		this.fontSize = fontSize;
		this.hover = hover;
		this.color = color;
		this.ctx = ctx;
		this.cam = cam;
		this.robot = robot;

		this.ctx.font = `${this.fontSize}px Rubik Mono One`;
		const metrics = this.ctx.measureText(this.content);
		this.size = new Vector(
			metrics.width,
			metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
		);
	}

	public draw() {
		if (this.hover) {
			const pos = this.robot.getPosition();
			const { bounds } = this;
			this.ctx.globalAlpha =
				pos.y > bounds.top &&
				pos.y < bounds.bottom &&
				pos.x > bounds.left &&
				pos.x < bounds.right
					? 0.8
					: 0.5;
		} else this.ctx.globalAlpha = 0.5;

		this.ctx.fillStyle = this.color;
		this.ctx.font = `${this.fontSize}px Rubik Mono One`;

		this.ctx.fillText(
			this.content,
			Math.round(this.pos.x - this.cam.x - this.size.x / 2),
			Math.round(this.pos.y - this.cam.y + this.size.y / 2)
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
