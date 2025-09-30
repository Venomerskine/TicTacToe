
// Game board creation
const Gameboard = () =>{
    // Consts
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => cell())
  );


// Cell creations
   
     const getBoard = () => board.map(row => row.map(c => c.getValue()));

    const markMarker = (row, col, player) => {
        if(board[row][col].getValue() === null) {
            board[row][col].addMarker(player)
        }
        return false
    }

    const printBoard = () => {
        console.log(getBoard)
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

// Controller

const gameController = ( 
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) => {
    const board = Gameboard()
   
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

    const getActivePlayer = () => activePlayer;

    const playRound = (row, col) => {
    const success = board.markMarker(row, col, getActivePlayer().token)
    if (success) switchPlayerTurn()
}

}