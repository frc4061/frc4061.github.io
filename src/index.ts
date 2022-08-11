import { __robotSpeed__, __robotTurn__ } from "./lib/constants";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const keys = {
	up: false,
	down: false,
	left: false,
	right: false
};

const robot = {
	pos: {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	},
	angle: 0,
	vel: 0
};

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

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (keys.up) robot.vel += __robotSpeed__;
	if (keys.down) robot.vel -= __robotSpeed__;
	if (keys.left) robot.angle -= __robotTurn__;
	if (keys.right) robot.angle += __robotTurn__;

	robot.pos.x += Math.cos(robot.angle) * robot.vel;
	robot.pos.y += Math.sin(robot.angle) * robot.vel;

	robot.vel *= 0.9;

	ctx.fillStyle = "#ffffff";
	ctx.translate(robot.pos.x, robot.pos.y);
	ctx.rotate(robot.angle);
	ctx.fillRect(-20, -10, 40, 20);
	ctx.rotate(-robot.angle);
	ctx.translate(-robot.pos.x, -robot.pos.y);
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
