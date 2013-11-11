var top = "  ^  \n",
	middle = " ^^^ \n"
	bottom = "^^^^^",
	spaceCraft = top + middle + bottom,
	craftX = 0,
	position = null;

var init = function init(lines) {
	position = parseInt(lines, 10) - 3;
	return spaceCraft;
}

var moveLeft = function moveLeft(win) {
	win.clear();
	craftX--;
	middle = middle.slice(1, middle.length);
	bottom = bottom.slice(1, bottom.length);
	spaceCraft = top + middle + bottom;
	win.print(position, craftX, spaceCraft);
	win.refresh();
};

var moveRight = function moveRight(win) {
	win.clear();
	craftX++;
	middle = " " + middle;
	bottom = " " + bottom;
	spaceCraft = top + middle + bottom;
	win.print(position, craftX, spaceCraft);
	win.refresh();
};

exports.moveRight = moveRight;
exports.moveLeft = moveLeft;
exports.init = init;