# Minesweeper

## Introduction

This is the famous Minesweeper game developed in React It provides all the functionality of the classic game along with some additional features like Validate, Cheat, User history and Leader board. It has three predefined difficulties Easy, Medium and Expert for the user to choose from along with provision to set custom board sizes and number of mines. 


## Architecture

The main functionality/game logic is implemented in React.  On initial render of the board, it is filled with a default number (-10). When the user first clicks on any single tile, the game starts and board is filled with number of mines mentioned by the user. Then I calculate number of mines that are neighbor to particular tile and then assign that tile its count. Game always starts with 0 tile (no neighboring tile contains mines). When the user clicks on a 0 tile, I show all the neighboring tiles who has value 0 and first non 0 tile (excluding tile that contains mine). I have applied Depth First Search starting from 0 tile to simulate clicking neighboring tiles behavior. When the game is started and a tile is clicked I display only that tile (if non 0), and if the tile contains mine the game ends in loss. On every tile click I check if the game is Won or not depending on number of safe tiles( total tiles - number of mines) being equal to 0 or not. If the game ends in Win, I display all the location of the mines with a flag on it. If the game ends in Loss, I display all the mines location. Timer starts when the game starts (user first left click) and ends when the game ends wither in Win or Loss. Timer value becomes the score for that game. On validate button click I check the remaining tiles to be clicked so as to complete the game. On cheat button click I temporarily show the all mine locations for 2 sec. 


## Project/Code Structure
```bash
├── minesweeper
│   ├── public
│   └── src
│       ├── Actions
│       ├── Common
│       ├── Components
│       ├── Constants
│       ├── Images
│       ├── Pages
│       ├── Reducers
│       └── Utility
└── minesweeper_server
    ├── database
    ├── models
    ├── public
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    ├── routes
    ├── sql_db
    └── views
```


Minesweeper - Contains UI code <br>
Minesweeper_server - Contains code for API and DB.

## Game

### Rules

1. Game starts when player left clicks on any one of the tile, that tile is always a 0 tile.
2. When player clicks a 0 tile, all the neighboring tiles with first occurring non 0 tile or mine tile are displayed.
3. During the game, each tile denotes the number of mines that are in immediate neighboring tiles (vertical, horizontal and diagonal).
4. User can flag a particular tile by right clicking that tile if he thinks it may contain a mine.
5. When player clicks on a mine, the game ends in Loss.
6. On losing, if the player has wrongly flagged a tile as mine then it will be shown with a cross sign.
7. If the player successfully clicks all the safe tiles the game ends in victory and the timer value is considered as score.
8. On winning, all the mine locations are displayed but with a flag on it.

### Validate : 

When the game has started, if the player clicks on validate then a modal is shown with number of tiles that needs to be clicked in order to complete (Win/Lose) the game. If the game is not started or is ended, this button is disabled.

### Cheat:
	
When the game has started, if the player clicks on cheat button then mines locations are shown temporarily for 2 seconds during which tile clicks are disabled. After 2 seconds the user board is enabled and hiding all the mines location.

### New Game:

A player can click on New game button and select a difficulty level or provide a custom board configuration.

### Restart Game:

On winning or losing a particular game, player has an option to restart the game (contains same configuration)

### Timer:

Increments after every 1 second. On winning, the timer value is considered as score.

### Flags:

They are used to mark a tile as mine. They are initialized with number of mines on the board. On every flag placement, its value decreases.


## Application

### Home

On home screen, a player can play the minesweeper game with or without login. Login is optional for playing a game

### Login

Used to login to the application. Logged in user’s playing history will be logged and considered for Leader board.

### Register

Used to register a new user to the application.

### User

Shows player’s game history with status, score, date and difficulty level.

### Leader Board

Shows top 10 user’s who completed the game winning in shortest time depending on difficulty level.

## Technologies Used

UI - **React JS** <br>
CSS - **React Bootstrap** <br>
API - **Node JS** <br>
DB - **MySQL** <br>
Deployment - **Docker** <br>

## Known Issues

1. Currently I am saving the passwords directly in DB.
2. When number of mines are too large (greater than permissible limit of total tiles - 9)
3. Application not optimized for Mozilla browser (when player clicks on tile, tile content is shown as selected)
4. New game modal not optimized to view on Mobile.



