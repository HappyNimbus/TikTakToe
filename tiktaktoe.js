function Player(name, mark){

    return{name, mark};
}  

function GameLogic(board) {

    const checkWin = () => {
        console.log("Checking win...");
        // real win logic goes here
        return false;
    };

    const checkDraw = () => {
        return board.flat().every(cell => cell !== '0');
    };

    return { checkWin, checkDraw };
}


function GameController(){
    const board = GameBoard();
    board.createBoard(3,3);

    const logic = GameLogic(board.getBoard());

    const player1 = Player('Max', 'X');
    const player2 = Player('Yvonne', 'O');

    let currentPlayer = player1;
    let gameOver = false;
    console.log(`Game start: ${currentPlayer.name} goes first`);
    console.log(board.getBoard());

    const playerTurn = (row, col) =>{
        if (gameOver) return;

        const success = board.placeMarker(row,col, currentPlayer.mark);
        if(!success) return;

        if (logic.checkWin()) {
            console.log(`${currentPlayer.name} wins!`);
            gameOver = true;
            return;
        }

        if (logic.checkDraw()) {
            console.log("Draw!");
            gameOver = true;
            return;
        }

        console.log(board.getBoard());
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    return { playerTurn, getBoard: board.getBoard};
}



function GameBoard(){

    const board = [];

    const createBoard = (rows, cols) =>{

        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < cols; j++){
                board[i].push('0');
            }
        }
    }

    const getBoard = () => board;
    
    const placeMarker = (rows,cols,mark) =>{
        
        if(board[rows][cols] !== '0') return false;
        else{
            board[rows][cols] = mark;
            return true;
        }
    }
    return {createBoard, getBoard, placeMarker};
}


const game = GameController();
game.playerTurn(0,1);
game.playerTurn(1,2);

