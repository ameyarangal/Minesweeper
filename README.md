# Minesweeper

## Introduction

This is the famous Minesweeper game developed in React It provides all the functionality of the classic game along with some additional features like Validate, Cheat, User history and Leader board. It has three predefined difficulties Easy, Medium and Expert for the user to choose from along with provision to set custom board sizes and number of mines. 


## Architecture

The main functionality/game logic is implemented in React.  On initial render of the board, it is filled with a default number (-10). When the player first clicks on any single tile, the game starts and board is filled with number of mines mentioned by the user except for the first clicked tile. Then a tile is assigned value that equals number of mines surroding that particular tile. Game always starts with 0 tile (no neighboring tile contains mines). When the player clicks on a 0 tile, all the neighboring tiles who has value 0 and first non 0 tile (excluding tile that contains mine) are displayed. Applied Depth First Search starting from 0 tile to simulate clicking neighboring tiles behavior. When the game is started and a tile is clicked only that tike is displayed (if non 0), and if the tile contains mine the game ends in loss. On every tile click there is a check if the game is Won or not depending on number of safe tiles( total tiles - number of mines) being equal to 0 or not. If the game ends in Win, all the location of the mines are displayed with a flag on it. If the game ends in Loss, all the mines location are displayed with mines on it. Timer starts when the game starts (user first left click) and ends when the game ends either in Win or Loss. Timer value becomes the score for that game. On validate button click user is informed on the remaining tiles to be clicked so as to complete the game. On cheat button click all mine locations are displayed temporarily for 2 sec before rendering the previous board. Player can flag a particular tile and if the player loses a wrongly placed tile is shown as cross. <br>

In code, mine is represented as -1 value and game states are "Default" (Not started), "Playing", "Victory" and "Lost".


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

### Login Page

Used to login to the application. Logged in user’s playing history will be logged and considered for Leader board.

### Register Page

Used to register a new user to the application.

### History Page

Shows player’s game history with status, score, date and difficulty level.

### Leader Board Page

Shows top 10 user’s who completed the game winning in shortest time depending on difficulty level.

### Help Page

Provides help regarding playing the game and using the application.

## Technologies Used

UI - **React JS** <br>
CSS - **React Bootstrap** <br>
API - **Node JS** <br>
DB - **MySQL** <br>
Deployment - **Docker** <br>

## Known Issues

1. Currently I am saving the passwords directly in DB.
2. Application not optimized for Mozilla browser (when player clicks on tile, tile content is shown as selected)
3. New game modal not optimized to view on Mobile.
4. Sometimes player win's before opening few tiles. This issue is very intermittent, encountered on 2 instances after playing 10-15 games in a row.



