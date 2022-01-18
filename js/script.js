//# Functions
const createClassedElement = (elementClass) => {
	const element = document.createElement('div');
	element.className = elementClass;
	return element;
}

const toggleClassOnClick = (target, classToToggle) => {
	target.addEventListener('click', function () {
		target.classList.toggle(classToToggle);
	});
}

const toggleClass = (target, classToToggle) => {
	if (target.classList.contains(classToToggle)) {
		target.classList.remove(classToToggle);
	} else if (!target.classList.contains(classToToggle)) {
		target.classList.add(classToToggle);
	}
}

//# Program

const cellsOne = 10;
const cellsTwo = 9;
const cellsThree = 7;

const rowsOne = 10;
const rowsTwo = 9;
const rowsThree = 7;

const totalOne = cellsOne * rowsOne;
const totalTwo = cellsTwo * rowsTwo;
const totalThree = cellsThree * rowsThree;

const classOne = 'cell-one';
const classTwo = 'cell-two';
const classThree = 'cell-three';

const classActive = 'active';

const classRemove = 'remove';

const grid = document.getElementById('grid');

const spotlight = document.getElementById('spotlight');

const start = document.getElementById('start');

const reset = document.getElementById('reset');

let playToggle = false;

start.addEventListener('click', function () {

	const difficulty = parseInt(document.getElementById('difficulty').value);
	console.log('Difficulty chosen: ' + difficulty);

	if (playToggle) {
		alert('Please, press the Reset button first.')
	} else {
		if (difficulty === 0) {
			alert('Please, choose a difficulty.');
		} else {
			if (difficulty === 1) {
				for (i = 0; i < totalOne; i++) {
					const cell = createClassedElement(classOne);
					grid.appendChild(cell);
					cell.innerText = i + 1;
					playToggle = true;
					toggleClassOnClick(cell, classActive);
				}
			} else if (difficulty === 2) {
				for (i = 0; i < totalTwo; i++) {
					const cell = createClassedElement(classTwo);
					grid.appendChild(cell);
					cell.innerText = i + 1;
					playToggle = true;
					toggleClassOnClick(cell, classActive);
				}
			} else if (difficulty === 3) {
				for (i = 0; i < totalThree; i++) {
					const cell = createClassedElement(classThree);
					grid.appendChild(cell);
					cell.innerText = i + 1;
					playToggle = true;
					toggleClassOnClick(cell, classActive);
				}
			}
			toggleClass(spotlight, classRemove);
		}
	}
});

reset.addEventListener('click', function () {
	location.reload();
});