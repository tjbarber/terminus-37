var top = "  ^  \n",
	middle = " ^^^ \n"
	bottom = "^^^^^",
	spaceCraft = top + middle + bottom,
	craftX = 0,
	position = null,
	attrs = null,
	colors = null;

var init = function init(main, win, nc) {
	position = parseInt(nc.lines, 10) - 3;
	attrs = nc.attrs;
	colors = nc.colors;

	win.on("inputChar", function(character, inputChar, isKey) {
		// until I find a way to make it work another way
		if (inputChar === 27) {
			main.close();
		} else if (inputChar === 261 && craftX < nc.cols - 6) {
			/* pressing right */
			moveRight(win, nc);
		} else if (inputChar === 260 && craftX > 1) {
			/* pressing left */
			moveLeft(win, nc);
		}
	});

	drawCraft(win, nc);
}

var drawCraft = function drawCraft(win, nc) {
	win.attrset(nc.colorPair(4));
	win.attron(attrs["BOLD"]);
	win.print(position, craftX, spaceCraft);
	win.attroff(attrs["BOLD"]);
	win.refresh();
}

var moveLeft = function moveLeft(win, nc) {
	win.clear();
	craftX--;
	middle = middle.slice(1, middle.length);
	bottom = bottom.slice(1, bottom.length);
	spaceCraft = top + middle + bottom;
	drawCraft(win, nc);	
};

var moveRight = function moveRight(win, nc) {
	win.clear();
	craftX++;
	middle = " " + middle;
	bottom = " " + bottom;
	spaceCraft = top + middle + bottom;
	drawCraft(win, nc);
};

exports.moveRight = moveRight;
exports.moveLeft = moveLeft;
exports.init = init;