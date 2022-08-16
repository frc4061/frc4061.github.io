import Vector from "../lib/vector";
import Robot from "./robot";
import Text from "./text";

export default class Redirect extends Text {
	private target: string;

	private opened: boolean;

	public constructor(
		pos: Vector,
		content: string,
		fontSize: number,
		target: string,
		ctx: CanvasRenderingContext2D,
		cam: Vector,
		robot: Robot
	) {
		super(pos, content, fontSize, ctx, cam, robot, true, "#ff6600");

		this.target = target;
		this.opened = false;
	}

	public update() {
		const pos = this.robot.getPosition();
		const { bounds } = this;
		if (
			pos.y > bounds.top &&
			pos.y < bounds.bottom &&
			pos.x > bounds.left &&
			pos.x < bounds.right
		) {
			if (!this.opened) {
				this.opened = true;
				window.open(this.target);
				return true;
			}
		} else this.opened = false;
		return false;
	}
}
