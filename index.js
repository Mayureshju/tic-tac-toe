
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

// intialialise game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box,index)=>{
box.innerHTML= "";
boxes[index].style.pointerEvents = "all";
box.classList = `box box${index+1}`;
  })
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}
initGame();

function swap(){
if (currentPlayer == "X") {
    currentPlayer = "0";
}else{
    currentPlayer = "X";
}
gameInfo.innerHTML = `Current Player ${currentPlayer}`;
}
function handleClick(index){
    if (gameGrid[index] == "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swap();
        // check if anyone win
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});


function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else {
                    answer = "O";
                }

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    if (answer !== "") {
        gameInfo.innerHTML = `Winner is ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    else{
        let fillcount = 0;
        gameGrid.forEach((box)=>{
            if (box !== "") {
                fillcount++;
            }
        })
        if (fillcount ==9) {
            gameInfo.innerHTML = "Game Tied";
            newGameBtn.classList.add("active");

        }
    }
}

newGameBtn.addEventListener('click',initGame);
