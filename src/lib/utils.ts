export const getFrame = (speed: number, total: number) =>
	Math.floor((Date.now() % (speed * total)) / speed);
