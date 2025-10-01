
// Game board creation
const Gameboard = () =>{
   
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => cell())
  );


     const getBoard = () => board.map(row => row.map(c => c.getValue()));

    const markMarker = (row, col, player) => {
        if(board[row][col].getValue() === null) {
            return board[row][col].addMarker(player)
        }
        
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

      const checkWin = (player) => {

        const g = getBoard();

        //rows
        for (let r = 0; r < rows; r++) if (g[r].every(v => v === player)) return true;
        
        //columns
        for (let c = 0; c < columns; c++) if (g.every(row => row[c] === player)) return true;
        

        //diagonals
        if (g.every((row, i) => row[i] === player)) return true;
        if (g.every((row, i) => row[columns - 1 - i] === player)) return true;
        return false;
  };

  const reset = () => {
    board.forEach(row => {
        row.forEach(cell => {
            cell.reset()
        })
    })
  }
    return{
        getBoard,
        markMarker,
        printBoard,
        checkWin,
        reset
    }
}

// Cell 
const cell = () => {
    let value = null;
    const addMarker = (player) => {
        if(value !== null) return false
        value = player
        return true
    }

    const getValue = () => value

    const reset = () => {value = null}

    return {
        addMarker,
        getValue,
        reset
    }
}

// Game Controller

const gameController = ( 
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) => {
    const board = Gameboard()
    let isGameOver = false;
   
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getPlayers = () =>  players

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard()
    }
                   // Play round
    const playRound = (row, col) => {

       const success = board.markMarker(row, col, getActivePlayer().token)

       if (!success) return 

       if(board.checkWin(getActivePlayer().token)) {
        console.log(`${getActivePlayer().name} wins!`);
        isGameOver = true;
        return
       }

       if (board.getBoard().flat().every(cell => cell !== null)) {
        console.log("It's a draw!");
        isGameOver = true;
        return;
    }
    switchPlayerTurn();
    printNewRound();
}

printNewRound()



const getIsGameOver = () => isGameOver;

const resetGame = () => {
    board.reset()
    activePlayer = players[0]
    isGameOver = false
    printNewRound()
}



return {
    playRound,
    getActivePlayer,
    getIsGameOver,
    getPlayers,
    getBoard: board.getBoard,
    resetGame
}
}

// Screen controller
const ScreenController = () => {
    
    const playerOneName = prompt("Enter Player 1's name (X):", "Player One") || "Player One";
    const playerTwoName = prompt("Enter Player 2's name (O):", "Player Two") || "Player Two";


    const game = gameController(playerOneName, playerTwoName);
    const playerTurnDiv = document.querySelector(".turn")
    const boardDiv = document.querySelector(".board")
    const resetButton = document.querySelector(".reset-button")

const clickHandlerReset = () => {
    game.resetGame();
    updateScreen()
}

const updateScreen = () => {
    boardDiv.textContent = "";

    const boardValues = game.getBoard(); 
    const activePlayer = game.getActivePlayer();

    if (game.getIsGameOver()) {
        const isDraw = boardValues.flat().every(cell => cell !== null);

        if (isDraw) {
            playerTurnDiv.textContent = "It's a Draw!";
        } else {
            
            const winner = activePlayer;
            playerTurnDiv.textContent = `${winner.name} WINS!`;
        }
    } else {
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    
    boardValues.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.col = colIndex;
            cellButton.textContent = cell || "";
            boardDiv.appendChild(cellButton);
        });
    });
};



// Click Handler
const clickHandlerBoard= (e) => {

    if (game.getIsGameOver()) return

    const row = parseInt(e.target.dataset.row, 10);
    const col = parseInt(e.target.dataset.col, 10);

    if (isNaN(row) || isNaN(col)) return;

    game.playRound(row, col);
    updateScreen();
}

 boardDiv.addEventListener("click", clickHandlerBoard);
 resetButton.addEventListener("click", clickHandlerReset);

 updateScreen()
}

ScreenController()