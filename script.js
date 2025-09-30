
// Game board creation
const Gameboard = () =>{
    // Consts
    const rows = 3;
    const columns = 3;
    const board = []


// Cell creations
    for (let i = 0; i < rows; i++ ){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(cell())
        }
    }

    const getBoard = () => board

    const markMarker = () => {
        const availableCell = board.filter()
        board.markMarker(player)
    }

}

// Cell 
const cell = () => {
    let value = 0;
    const addMarker = (player) => {
        value = player
    }

    const getValue = () => value

    return {
        addMarker,
        getValue
    }
}