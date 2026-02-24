const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let playingBoard = [];
let playerRound = 0;

let gameStatus = true

startGame();
addResetListener();

function startGame () {
    let size = prompt("Введите размер поля")
    renderGrid(size,size);
}

function checkWinner(player) {
    const size = playingBoard.length;

    for (let i = 0; i < size; i++) {
        let win = true;
        for (let j = 0; j < size; j++) {
            if (playingBoard[i][j] !== player) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }

    for (let j = 0; j < size; j++) {
        let win = true;
        for (let i = 0; i < size; i++) {
            if (playingBoard[i][j] !== player) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }

    let win = true;
    for (let i = 0; i < size; i++) {
        if (playingBoard[i][i] !== player) {
            win = false;
            break;
        }
    }
    if (win) {
        return true;
    }

    win = true;
    for (let i = 0; i < size; i++) {
        if (playingBoard[i][size - 1 - i] !== player) {
            win = false;
            break;
        }
    }
    if (win) return true;

    return false;
}

function renderGrid (size) {
    container.innerHTML = '';
    initGame(size, size);
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код ту
  // т
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!gameStatus){
      return;
    }
    curPlayer = playerRound % 2 ? CROSS : ZERO;
    console.log(playingBoard[row][col]);
    if (playingBoard[row][col] === 0){
      renderSymbolInCell(curPlayer, row, col)
      playingBoard[row][col] = curPlayer;
      playerRound++;

    }


        /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    startGame();
}


function initGame (rows, cols) {
  playingBoard = [];
  for (let i = 0; i < rows; i++) {
    playingBoard[i] = [];
    for (let j = 0; j < cols; j++) {
      playingBoard[i][j] = 0;
    }
  }

}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
