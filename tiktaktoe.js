let startGame;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const game = document.getElementById("game");

startBtn.addEventListener("click", () => {
  const p1 = document.getElementById("player1").value || "Player X";
  const p2 = document.getElementById("player2").value || "Player O";

  startScreen.remove("hidden");
  game.classList.remove("hidden");

  startGame = GameController(p1, p2);
});


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


function GameController(p1, p2){
    const board = GameBoard();
    board.createBoard(3, 3);

    const logic = GameLogic(board.getBoard());

    const player1 = Player(p1, 'X');
    const player2 = Player(p2, 'O');

    let currentPlayer = player1;
    let gameOver = false;

    const pTurn = document.getElementById("p-turn");
    pTurn.textContent = currentPlayer.name;

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

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        pTurn.textContent = currentPlayer.name;
    };

    const squares = document.querySelectorAll(".section");

    squares.forEach((square, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    square.addEventListener("click", () => {
        
        square.textContent = currentPlayer.mark;
        playerTurn(row, col);
        
        });
    });

    return { playerTurn};
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
