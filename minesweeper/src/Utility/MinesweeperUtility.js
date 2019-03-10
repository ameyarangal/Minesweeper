export const placeMines = (minesToBePlaced, board, i, j) => {
  let m = board.length;
  let n = board[0].length;
  //   let mines_location = [];
  console.log(`place mines except i ${i} and j ${j}`);
  console.log(`place ${minesToBePlaced} in board`);
  console.log(`board in place mines`);
  console.log(board);
  while (minesToBePlaced > 0) {
    let row = Math.floor(Math.random() * Math.floor(m));
    let col = Math.floor(Math.random() * Math.floor(n));

    if (isMineLocationValid(row, col, i, j, board)) {
      board[row][col]["value"] = -1;
      //   mines_location.push([i, j]);
      minesToBePlaced = minesToBePlaced - 1;
    }
  }
  console.log(`board with mines`, board);
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

export const return_winning_board = board => {
  let winning_board = [];
  board.map(row => {
    let column = [];
    row.map(col => {
      if (col["value"] == -1) {
        column.push({ value: col["value"], display: true, flag: true });
      } else {
        column.push({ value: col["value"], display: true, flag: false });
      }
    });
    winning_board.push(column);
  });
  return winning_board;

  //   for (let i = 0; i < board.length; i++) {
  //     for (let j = 0; j < board[0].length; j++) {
  //       if (board[i][j]["value"] == -1) {
  //         board[i][j]["display"] = true;
  //         board[i][j]["flag"] = true;
  //       }
  //     }
  //     return board;
  //   }
};

export const click_all_adjacent_0_cells = (board, i, j, m, n, count) => {
  console.log(`dfs`);
  console.log(count);
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
  // click_all_adjacent_0_cells(board, i + 1, j, m, n, count);
  // click_all_adjacent_0_cells(board, i - 1, j, m, n, count);
  // click_all_adjacent_0_cells(board, i, j + 1, m, n, count);
  // click_all_adjacent_0_cells(board, i, j - 1, m, n, count);
  // click_all_adjacent_0_cells(board, i + 1, j + 1, m, n, count);
  // click_all_adjacent_0_cells(board, i - 1, j - 1, m, n, count);
  // click_all_adjacent_0_cells(board, i + 1, j - 1, m, n, count);
  // click_all_adjacent_0_cells(board, i - 1, j + 1, m, n, count);

  // return { board: board, clicked: count };

  // if (i < 0 || i >= m || j < 0 || j >= n || board[i][j]["display"] == true) {
  //   return;
  // }
  // if (board[i][j]["value"] > 0) {
  //   board[i][j]["display"] = true;
  //   return;
  // }

  // board[i][j]["display"] = true;
  // click_all_adjacent_0_cells(board, i + 1, j, m, n);
  // click_all_adjacent_0_cells(board, i - 1, j, m, n);
  // click_all_adjacent_0_cells(board, i, j + 1, m, n);
  // click_all_adjacent_0_cells(board, i, j - 1, m, n);
  // click_all_adjacent_0_cells(board, i + 1, j + 1, m, n);
  // click_all_adjacent_0_cells(board, i - 1, j - 1, m, n);
  // click_all_adjacent_0_cells(board, i + 1, j - 1, m, n);
  // click_all_adjacent_0_cells(board, i - 1, j + 1, m, n);
  // return board;
};
