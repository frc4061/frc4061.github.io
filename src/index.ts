import { __robotSpeed__, __robotTurn__ } from "./lib/constants";
import { Robot } from "./robot";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const keys = {
	up: false,
	down: false,
	left: false,
	right: false
};

const robot = new Robot(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

document.addEventListener("keydown", ev => handleKey(ev, true));
document.addEventListener("keyup", ev => handleKey(ev, false));

ctx.lineWidth = 4;

const update = () => {
	requestAnimationFrame(() => update());

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (keys.up) robot.accelerate(__robotSpeed__);
	if (keys.down) robot.accelerate(-__robotSpeed__);
	if (keys.left) robot.rotate(-__robotTurn__);
	if (keys.right) robot.rotate(__robotTurn__);

	robot.update();
	robot.draw();
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
