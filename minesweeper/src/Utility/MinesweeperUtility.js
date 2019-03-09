export const placeMines = (minesToBePlaced, board, i, j) => {
  let m = board.length;
  let n = board[0].length;
  //   let mines_location = [];
  console.log(`place mines except i ${i} and j ${j}`);
  while (minesToBePlaced > 0) {
    let row = Math.floor(Math.random() * Math.floor(m));
    let col = Math.floor(Math.random() * Math.floor(n));

    if (isMineLocationValid(row, col, i, j, board)) {
      board[row][col]["value"] = -1;
      //   mines_location.push([i, j]);
      minesToBePlaced = minesToBePlaced - 1;
    }
  }
  return board;
};

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

export const calculateNeighbors = (board, i, j, m, n) => {
  let count = 0;
  //   console.log(`calculate neighbors`, board);
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

export const click_all_adjacent_0_cells = board => {};
