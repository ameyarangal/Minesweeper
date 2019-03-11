// Function to place n mines on the given board except for the initial clicked tile (i, j)
// Returns - Board with mines places randomly.
export const placeMines = (minesToBePlaced, board, i, j) => {
  let m = board.length;
  let n = board[0].length;

  while (minesToBePlaced > 0) {
    let row = Math.floor(Math.random() * Math.floor(m));
    let col = Math.floor(Math.random() * Math.floor(n));

    if (isMineLocationValid(row, col, i, j, board)) {
      board[row][col]["value"] = -1;
      minesToBePlaced = minesToBePlaced - 1;
    }
  }
  return board;
};

// Helper function to determine if a mine can be placed at a particular location.
// Checks if the random location is not in immediate neighbor of the initial clicked
// tile as we need 0 to start the game.
// Returns - Boolean whether a mine can be placed on given tile position.
const isMineLocationValid = (
  row,
  col,
  initital_click_i,
  initial_click_j,
  board
) => {
  let m = board.length;
  let n = board.length;
  if (board[row][col]["value"] === -1) {
    return false;
  }
  if (row === initital_click_i && col === initial_click_j) {
    return false;
  }

  if (
    initital_click_i + 1 < m &&
    initital_click_i + 1 === row &&
    initial_click_j === col
  ) {
    return false;
  }
  if (
    initital_click_i - 1 >= 0 &&
    initital_click_i - 1 === row &&
    initial_click_j === col
  ) {
    return false;
  }

  if (
    initial_click_j + 1 < n &&
    initial_click_j + 1 === col &&
    initital_click_i === row
  ) {
    return false;
  }
  if (
    initial_click_j - 1 >= 0 &&
    initial_click_j - 1 === col &&
    initital_click_i === row
  ) {
    return false;
  }

  if (
    initial_click_j - 1 >= 0 &&
    initital_click_i + 1 < m &&
    initial_click_j - 1 === col &&
    initital_click_i + 1 === row
  ) {
    return false;
  }
  if (
    initial_click_j - 1 >= 0 &&
    initital_click_i - 1 >= 0 &&
    initial_click_j - 1 === col &&
    initital_click_i - 1 === row
  ) {
    return false;
  }

  if (
    initial_click_j + 1 < n &&
    initital_click_i + 1 < m &&
    initial_click_j + 1 === col &&
    initital_click_i + 1 === row
  ) {
    return false;
  }
  if (
    initial_click_j + 1 < n &&
    initital_click_i - 1 >= 0 &&
    initial_click_j + 1 === col &&
    initital_click_i - 1 === row
  ) {
    return false;
  }

  return true;
};

// Function to calculate number of mines present within 8 neighbors for a particular tile.
// Returns - Number of mines present in the 8 neighbors for a particular tile at (i, j)
export const calculateNeighbors = (board, i, j, m, n) => {
  let count = 0;

  if (i + 1 < m && board[i + 1][j]["value"] == -1) {
    count += 1;
  }

  if (i - 1 >= 0 && board[i - 1][j]["value"] == -1) {
    count += 1;
  }
  if (j + 1 < n && board[i][j + 1]["value"] == -1) {
    count += 1;
  }
  if (j - 1 >= 0 && board[i][j - 1]["value"] == -1) {
    count += 1;
  }
  if (i + 1 < m && j + 1 < n && board[i + 1][j + 1]["value"] == -1) {
    count += 1;
  }
  if (i + 1 < m && j - 1 >= 0 && board[i + 1][j - 1]["value"] == -1) {
    count += 1;
  }
  if (i - 1 >= 0 && j + 1 < n && board[i - 1][j + 1]["value"] == -1) {
    count += 1;
  }
  if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1]["value"] == -1) {
    count += 1;
  }
  return count;
};

// Function to update the given board with count of neighbouring mines for each tile
// in the board.
// Returns - Updated board with each (i, j) location filled with neighbouring mines count.
export const calculate_board_with_Neighbors = board => {
  let m = board.length;
  let n = board[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j]["value"] != -1) {
        board[i][j]["value"] = calculateNeighbors(board, i, j, m, n);
      }
    }
  }
  return board;
};

// Function to calculate the board when player has won. This will display all
// the flags on the board where there are mines.
// Returns - Updated winning board.
export const return_winning_board = board => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j]["value"] == -1) {
        board[i][j]["display"] = true;
        board[i][j]["flag"] = true;
      }
    }
  }
  return board;
};

// Function that updates all the neighboring 0's and first non zero (except mines) tile.
// To enable this I have applied DFS algorithm starting from the position of 0'th tile.
// Returns - Updated board with all the neighboring 0's and non mine tiles displayed and also the
// count of tiles clicked in the process.
export const click_all_adjacent_0_cells = (board, i, j, m, n, count) => {
  if (i < 0 || i >= m || j < 0 || j >= n || board[i][j]["display"] == true) {
    return { board: board, clicked: count };
  }
  if (board[i][j]["value"] > 0 && board[i][j]["display"] != true) {
    board[i][j]["display"] = true;
    count += 1;
    return { board: board, clicked: count };
  }

  board[i][j]["display"] = true;
  count += 1;
  let r1 = click_all_adjacent_0_cells(board, i + 1, j, m, n, count);
  let r2 = click_all_adjacent_0_cells(r1.board, i - 1, j, m, n, r1.clicked);
  let r3 = click_all_adjacent_0_cells(r2.board, i, j + 1, m, n, r2.clicked);
  let r4 = click_all_adjacent_0_cells(r3.board, i, j - 1, m, n, r3.clicked);
  let r5 = click_all_adjacent_0_cells(r4.board, i + 1, j + 1, m, n, r4.clicked);
  let r6 = click_all_adjacent_0_cells(r5.board, i - 1, j - 1, m, n, r5.clicked);
  let r7 = click_all_adjacent_0_cells(r6.board, i + 1, j - 1, m, n, r6.clicked);
  let r8 = click_all_adjacent_0_cells(r7.board, i - 1, j + 1, m, n, r7.clicked);
  return r8;
};
