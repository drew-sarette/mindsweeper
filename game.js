/* Global Variables */
const mindsweeper = [];
let memoryModeCheckBox = document.getElementById('memory-mode');
let memoryMode = memoryModeCheckBox.checked;
const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById("start");
const sizeInput = document.getElementById('size-input')


startBtn.addEventListener("click", initialize);
memoryModeCheckBox.addEventListener('click', toggleMemoryMode);

function toggleMemoryMode() {
  memoryMode = memoryModeCheckBox.checked;
}

function forEach2D(arr2D, callback) {
  const rowLength = arr2D.length;
  for (let row = 0; row < rowLength; row++) {
    const colLength = arr2D[row].length;
    for (let col = 0; col < colLength; col++) {
      callback(arr2D[row][col]);
    }
  }
}

/* Create an array with a boolean for each div, representing the presence of a mine. Set a click-event listener for each square.  */
function initialize() {
  const size = validateSizeInput(sizeInput.value);
  if (!size) {
    sizeInput.value = null;
    alert('Invalid input. Please enter a whole number between 0 and 101');
    return;
  }
  while (mindsweeper.length) mindsweeper.pop();
  gameArea.innerHTML = null;
  gameArea.style.gridTemplateColumns = "repeat(" + size + ", 40px)";
  gameArea.style.gridTemplateRows = "repeat(" + size + ", 40px)";
  for (let row = 0; row < size; row++) {
    mindsweeper.push([])
    for (let col = 0; col < size; col++) {
      mindsweeper[row].push(makeSquare(row, col));
      gameArea.appendChild(mindsweeper[row][col].div);
    }
  }
}

function validateSizeInput(input) {
  const size = Number(input);
  if (isNaN(size) || size > 100 || size < 1|| size % 1){
    return null;
  }
  else {
    return size;
  }
}

function makeSquare(row, col) {
  const div = document.createElement('div');
  div.classList.add('game-square');
  const square =  {
    div: div,
    row: row,
    col: col,
    isMine: (Math.floor(Math.random() * 5) === 0),
    clicked: false,
    flagged: false
  }
  div.addEventListener('mousedown', () => handleMouseDown(square));
  return square;
}

/* Check if the clicked square was a mine, then apply the appropriate CSS class. */
function handleMouseDown(square) {
  square.div.addEventListener('mouseup', function handleMouseup() {
    clearTimeout(timeoutID1);
    if (!square.clicked && !square.flagged) checkMove(square);
    square.div.removeEventListener('mouseup', handleMouseup);
  });
  const timeoutID1 = setTimeout(() => { 
    toggleFlagState(square); 
  }, 400);
}

function checkMove(square) {
  [row, col] = [square.row, square.col];
  square.clicked = true;
  if (square.isMine) {
    youLose();
  }
  else {
    square.div.classList.add('safe');
    
    square.div.textContent = countAdjacentMines(row, col);
    if (memoryMode) {
      setTimeout(() => { square.div.textContent = null }, 2000);
    }
    if (youWon()) {
      const winnerObj = {
        name: prompt('Congratulations!  Enter your name to post your score.'),
        gameState: mindsweeper
      }
      Object.freeze(winnerObj);
    }
  }
}

function toggleFlagState(square) {
  if (square.flagged) {
    square.flagged = false;
    square.clicked = false;
    square.div.classList.remove('flagged');
    square.div.textContent = null;
  } else {
    if (square.clicked) return;
    square.flagged = true;
    square.div.textContent = 'F';
    square.div.classList.add('flagged');
  }
}

function youWon() {
  for (row = 0; row < mindsweeper.length; row++) {
    for (col = 0; col < mindsweeper.length; col++) {
      if (!mindsweeper[row][col].isMine && !mindsweeper[row][col].clicked) {
        return false;
      } else if (mindsweeper[row][col].isMine && mindsweeper[row][col].clicked){
        return false;
      }
    }
  }
  return true;
}


function youLose() {

  for (row = 0; row < mindsweeper.length; row++) {
    for (col = 0; col < mindsweeper.length; col++) {
      const square = mindsweeper[row][col];
      if (square.isMine && square.flagged) {
        break;
      }
      else if (square.isMine) {
        square.div.classList.add('mine');
      }
      else if (!square.clicked) {
        square.div.classList.add('safe');
        square.div.textContent = countAdjacentMines(row, col);
      }
    }
  }
}
/* Create an array containing all adjacent indexes, then remove the ones that are "off of the map".  Check map[] at each index to count the mines. */
function countAdjacentMines(row, col) {
  let adjacentMinesCounter = 0;
  const adjacentCoordinates = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
  ]
  const size = mindsweeper.length;
  adjacentCoordinates.forEach(([row, col]) => {
    if (row < 0 || col < 0 || row >= size || col >= size) return;
    if (mindsweeper[row][col].isMine) adjacentMinesCounter++;
  });
  return adjacentMinesCounter;
}