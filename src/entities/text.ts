import { Vector } from "../lib/vector";

export class Text {
	private pos: Vector;
	private content: string;
	private color: string;
	private alpha: number;
	private font: string;
	private ctx: CanvasRenderingContext2D;
	private cam: Vector;

	public constructor(
		pos: Vector,
		content: string,
		color: string,
		alpha: number,
		font: string,
		ctx: CanvasRenderingContext2D,
		cam: Vector
	) {
		this.pos = pos;
		this.content = content;
		this.color = color;
		this.alpha = alpha;
		this.font = font;
		this.ctx = ctx;
		this.cam = cam;
	}

	public draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.globalAlpha = this.alpha;
		this.ctx.font = this.font;
		const metrics = this.ctx.measureText(this.content);
		this.ctx.fillText(
			this.content,
			this.pos.x - this.cam.x - metrics.width / 2,
			this.pos.y -
				this.cam.y +
				(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) / 2
		);
		this.ctx.globalAlpha = 1;
	}
}
