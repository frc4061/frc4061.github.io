import data from "./data.json";
import Image from "./entities/image";
import Redirect from "./entities/redirect";
import Robot from "./entities/robot";
import Text from "./entities/text";
import { GRID_SIZE, LERP, SPEED, TURN_SPEED } from "./lib/constants";
import Vector from "./lib/vector";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let keys = {
	up: false,
	down: false,
	left: false,
	right: false
};
const cam = new Vector(-window.innerWidth / 2, -window.innerHeight / 2);
const robot = new Robot(ctx, cam);

const texts = data.texts.map(
	text =>
		new Text(
			new Vector(text[0] as number, text[1] as number),
			text[2] as string,
			text[3] as number,
			ctx,
			cam,
			robot
		)
);
const redirects = data.redirects.map(
	redirect =>
		new Redirect(
			new Vector(redirect[0] as number, redirect[1] as number),
			redirect[2] as string,
			redirect[3] as number,
			redirect[4] as string,
			ctx,
			cam,
			robot
		)
);
const images = data.images.map(
	image =>
		new Image(
			new Vector(image[0] as number, image[1] as number),
			image[2] as string,
			image[3] as number,
			ctx,
			cam,
			robot
		)
);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const update = () => {
	requestAnimationFrame(() => update());

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 2;
	ctx.strokeStyle = "#ddddff";

	ctx.beginPath();

	for (
		let i = Math.round(-cam.x % GRID_SIZE);
		i <= canvas.width;
		i += GRID_SIZE
	) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
	}
	for (
		let i = Math.round(-cam.y % GRID_SIZE);
		i <= canvas.height;
		i += GRID_SIZE
	) {
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
	}
	ctx.stroke();

	if (keys.up) robot.accelerate(SPEED);
	if (keys.down) robot.accelerate(-SPEED);
	if (keys.left) robot.turn(-TURN_SPEED);
	if (keys.right) robot.turn(TURN_SPEED);

	images.forEach(image => {
		const { bounds } = image;
		if (
			bounds.top < cam.y + canvas.height &&
			bounds.bottom > cam.y &&
			bounds.left < cam.x + canvas.width / 2 + canvas.width / 2 &&
			bounds.right > cam.x + canvas.width / 2 - canvas.width / 2
		)
			image.draw();
	});
	redirects.forEach(redirect => {
		const { bounds } = redirect;
		if (
			bounds.top < cam.y + canvas.height &&
			bounds.bottom > cam.y &&
			bounds.left < cam.x + canvas.width / 2 + canvas.width / 2 &&
			bounds.right > cam.x + canvas.width / 2 - canvas.width / 2
		) {
			if (redirect.update())
				keys = { up: false, down: false, left: false, right: false };
			redirect.draw();
		}
	});
	texts.forEach(text => {
		const { bounds } = text;
		if (
			bounds.top < cam.y + canvas.height &&
			bounds.bottom > cam.y &&
			bounds.left < cam.x + canvas.width / 2 + canvas.width / 2 &&
			bounds.right > cam.x + canvas.width / 2 - canvas.width / 2
		)
			text.draw();
	});

	robot.update();
	robot.draw();

	cam.x -= (cam.x + canvas.width / 2 - robot.getPosition().x) * LERP;
	cam.y -= (cam.y + canvas.height / 2 - robot.getPosition().y) * LERP;
};

const handleKey = (ev: KeyboardEvent, down: boolean) => {
	switch (ev.key) {
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
		default:
			return;
	}

	ev.preventDefault();
};

document.addEventListener("keydown", ev => handleKey(ev, true));
document.addEventListener("keyup", ev => handleKey(ev, false));

requestAnimationFrame(update);
