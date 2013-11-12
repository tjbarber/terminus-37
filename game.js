var ncurses = require("ncurses"),
	spaceCraft = require("./lib/spacecraft"),
	mainWin = new ncurses.Window();

ncurses.raw = true;
ncurses.showCursor = false;

var attrs = ncurses.attrs,
	colors = ncurses.colors,
	lines = ncurses.lines;

spaceCraft.init(mainWin, craftWin, ncurses);