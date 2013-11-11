var ncurses = require("ncurses"),
	win = new ncurses.Window();

ncurses.raw = true;
ncurses.showCursor = false;

var attrs = win.attrs,
	colors = win.colors,
	gameOn = false;
	
/* Space Craft */
var top = "  ^  \n",
	middle = " ^^^ \n"
	bottom = "^^^^^",
	spaceCraft = top + middle + bottom,
	craftX = 0,
	position = ncurses.lines - 3;

/* Functions */

var moveLeft = function moveLeft() {
	win.clear();
	craftX--;
	middle = middle.slice(1, middle.length);
	bottom = bottom.slice(1, bottom.length);
	spaceCraft = top + middle + bottom;
	win.print(position, craftX, spaceCraft);
	win.refresh();
};

var moveRight = function moveRight() {
	win.clear();
	craftX++;
	middle = " " + middle;
	bottom = " " + bottom;
	spaceCraft = top + middle + bottom;
	win.print(position, craftX, spaceCraft);
	win.refresh();
};

win.on("inputChar", function(character, inputChar, isKey) {
	if (inputChar === 27) {
		win.close();
	} else if (gameOn === true && inputChar === 261 && craftX < ncurses.cols - 6) {
		/* pressing right */
		moveRight();
	} else if (gameOn === true && inputChar === 260 && craftX > 1) {
		/* pressing left */
		moveLeft();
	}
});

win.print(position, craftX, spaceCraft);
gameOn = true;
win.refresh();

