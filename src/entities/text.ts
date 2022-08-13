import { Vector } from "../lib/vector";

export class Text {
	private pos: Vector;
	private content: string;
	private fontSize: number;
	private ctx: CanvasRenderingContext2D;
	private cam: Vector;

	public constructor(
		pos: Vector,
		content: string,
		fontSize: number,
		ctx: CanvasRenderingContext2D,
		cam: Vector
	) {
		this.pos = pos;
		this.content = content;
		this.fontSize = fontSize;
		this.ctx = ctx;
		this.cam = cam;
	}

	public draw() {
		this.ctx.fillStyle = "#1358bf";
		this.ctx.globalAlpha = 0.5;
		this.ctx.font = `${this.fontSize}px Rubik Mono One`;
		const metrics = this.ctx.measureText(this.content);
		this.ctx.fillText(
			this.content,
			Math.round(this.pos.x - this.cam.x - metrics.width / 2),
			Math.round(
				this.pos.y -
					this.cam.y +
					(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) /
						2
			)
		);
		this.ctx.globalAlpha = 1;
	}
}
