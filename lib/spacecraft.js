/* Space Craft */

var top = "  ^  \n",
	middle = " ^^^ \n"
	bottom = "^^^^^",
	spaceCraft = top + middle + bottom,
	craftX = 0,
	position = null,
	attrs = null,
	colors = null,
	fireLeft = true;

/* Functions */

var init = function init(main, win, nc) {
	position = parseInt(nc.lines, 10) - 3;
	attrs = nc.attrs;
	colors = nc.colors;
	win.top();
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
		} else if (inputChar === 32) {
			fireWeapon(nc, win);
		} else if (inputChar === 9) {
			// fireMACGun();
			// ^^ s00n
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

var fireWeapon = function fireWeapon(nc, win) {
	var bulletWin = new nc.Window(nc.lines - 4, nc.cols),
		bulletPosition = 5;

	bulletWin.show();

	var firingBullet = setTimeout(function fire() {
		bulletWin.clear();

		if (bulletPosition === nc.lines) {
			clearTimeout(firingBullet);
			win.top();
		}

		bulletWin.attrset(nc.colorPair(2));
		bulletWin.attron(attrs["BOLD"]);

		if (fireLeft === true) {
			bulletWin.print(nc.lines - bulletPosition, craftX, "|")
		} else {
			bulletWin.print(nc.lines - bulletPosition, craftX + 4, "|")
		}

		bulletWin.attroff(attrs["BOLD"]);
		bulletWin.refresh();
		bulletPosition++;

		setTimeout(fire, 20);
	}, 20);

	fireLeft = !fireLeft;
}

var fireMACGun = function fireMACGun() {

};

exports.moveRight = moveRight;
exports.moveLeft = moveLeft;
exports.init = init;