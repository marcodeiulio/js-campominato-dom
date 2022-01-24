//# Utilities
//* Variables
const select = document.getElementById("difficulty");
const grid = document.getElementById("grid");
const button = document.getElementById("play");
const resultMessage = document.getElementById('result-message');
const totalBombs = 16;
let columns;
let totalCells = columns * columns;
let attempts = 0;
let maxAttempts = 0;

//* Functions
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//# Program start
function start() {
	button.innerText = 'RESTART';
	grid.innerHTML = '';

	switch (select.value) {
		case "2":
			columns = 9;
			break;
		case "3":
			columns = 7;
			break;
		default:
			columns = 10;
			break;
	}

	totalCells = columns * columns;
	maxAttempts = totalCells - totalBombs;

	function generateBombs(totalBombs, totalNumber) {
		const bombs = [];
		while (bombs.length < totalBombs) {
			const randNumber = randomNum(1, totalNumber);
			if (!bombs.includes(randNumber)) bombs.push(randNumber);
		}
		return bombs;
	}

	function generateGrid(totalCells, cellsPerRow, bombs) {
		for (let i = 1; i <= totalCells; i++) {
			const cell = createCell(i, cellsPerRow);
			cell.addEventListener('click', (event) => onCellClick(event.target, bombs, i));
			grid.appendChild(cell);
		}
	}

	function createCell(cellId, cellsPerRow) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.innerText = cellId;
		const width = `calc(100% / ${cellsPerRow})`;
		cell.style.height = width;
		cell.style.width = width;
		return cell;
	}

	function onCellClick(clickedCell, bombs, number) {
		clickedCell.removeEventListener("click", onCellClick);

		if (bombs.includes(number)) gameOver(bombs, attempts, true);
		else {
			clickedCell.classList.add("safe")
			attempts++;
			if (attempts === maxAttempts) gameOver(bombs, attempts, false);
		}
	}

	function gameOver(bombs, attempts, isLoss) {
		const allCells = grid.querySelectorAll('.cell');
		for (let i = 0; i < allCells.length; i++) {
			allCells[i].removeEventListener('click', onCellClick);
		}
		showBombs(bombs);
		resultMessage.innerHTML = '';
		const message = document.createElement('h2');
		message.className = 'message';
		const messageText = !isLoss ? `You won with a score of ${attempts}!` : `Sorry, you lost with a score of ${attempts}!`
		message.innerText = messageText;
		resultMessage.appendChild(message);
	}

	function showBombs(bombs) {
		const cells = document.querySelectorAll('.cell');
		for (let i = 0; i < totalCells; i++) {
			const cell = cells[i];
			const cellId = parseInt(cell.innerText);
			if (bombs.includes(cellId)) cell.classList.add('bomb');
		}
	}

	//# Execution
	const bombs = generateBombs(totalBombs, totalCells)
	console.log(bombs);

	generateGrid(totalCells, columns, bombs);
}

button.addEventListener("click", () => start());