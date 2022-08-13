import { Vector } from "../lib/vector";

export class Image {
	private pos: Vector;
	private ctx: CanvasRenderingContext2D;
	private cam: Vector;

	public constructor(ctx: CanvasRenderingContext2D, cam: Vector) {
		this.ctx = ctx;
		this.cam = cam;
	}
}
