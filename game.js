var ncurses = require("ncurses"),
	spaceCraft = require("./lib/spacecraft"),
	win = new ncurses.Window();

ncurses.raw = true;
ncurses.showCursor = false;

var attrs = win.attrs,
	colors = win.colors,
	gameOn = false,
	lines = ncurses.lines,
	craft = spaceCraft.init(lines);

win.on("inputChar", function(character, inputChar, isKey) {
	if (inputChar === 27) {
		win.close();
	} else if (gameOn === true && inputChar === 261 && craftX < ncurses.cols - 6) {
		/* pressing right */
		spaceCraft.moveRight(win, ncurses);
	} else if (gameOn === true && inputChar === 260 && craftX > 1) {
		/* pressing left */
		spaceCraft.moveLeft(win, ncurses);
	}
});

win.print(position, craftX, craft);
gameOn = true;
win.refresh();

