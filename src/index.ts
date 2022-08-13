import {
	__gridSize__,
	__lerp__,
	__speed__,
	__turnSpeed__
} from "./lib/constants";
import { Vector } from "./lib/vector";
import { Robot } from "./entities/robot";
import { Text } from "./entities/text";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const keys = {
	up: false,
	down: false,
	left: false,
	right: false
};
const cam = new Vector(-window.innerWidth / 2, -window.innerHeight / 2);
const robot = new Robot(ctx, cam);
const title = new Text(Vector.ZERO, "SciBorgs", 150, ctx, cam);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

document.addEventListener("keydown", ev => handleKey(ev, true));
document.addEventListener("keyup", ev => handleKey(ev, false));

const update = () => {
	requestAnimationFrame(() => update());

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 2;
	ctx.strokeStyle = "#ddddff";

	ctx.beginPath();

	for (
		let i = Math.round(-cam.x % __gridSize__);
		i <= canvas.width;
		i += __gridSize__
	) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
	}
	for (
		let i = Math.round(-cam.y % __gridSize__);
		i <= canvas.height;
		i += __gridSize__
	) {
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
	}
	ctx.stroke();

	if (keys.up) robot.accelerate(__speed__);
	if (keys.down) robot.accelerate(-__speed__);
	if (keys.left) robot.turn(-__turnSpeed__);
	if (keys.right) robot.turn(__turnSpeed__);

	title.draw();

	robot.update();
	robot.draw();

	cam.x -= (cam.x + canvas.width / 2 - robot.getPosition().x) * __lerp__;
	cam.y -= (cam.y + canvas.height / 2 - robot.getPosition().y) * __lerp__;
};

const handleKey = (ev: KeyboardEvent, down: boolean) => {
	switch (ev.key) {
		default:
			return;
		case "ArrowUp":
		case "w":
			keys.up = down;
			break;
		case "ArrowDown":
		case "s":
			keys.down = down;
			break;
		case "ArrowLeft":
		case "a":
			keys.left = down;
			break;
		case "ArrowRight":
		case "d":
			keys.right = down;
			break;
	}

	ev.preventDefault();
};

requestAnimationFrame(update);
