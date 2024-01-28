var activePlayer = 1;
var playerPosition = [[0,0,0],[0,0,0],[0,0,0]]
var score = [0,0]
var isPlaying = false
var complateBoardCombineDefault = [
  "012", "036", "048",
  "147",
  "258", "246",
  "345",
  "678",
]
var complateBoardCombine = [
  "012", "036", "048",
  "147",
  "258", "246",
  "345",
  "678",
]
var elements = document.getElementsByClassName("box");
var playerOneScoreEl = document.getElementById("p1-score");
var playerTwoScoreEl = document.getElementById("p2-score");
var playerActiveInfoEl = document.getElementById("player-active-info");
var gameInfoWrapperEl = document.getElementById("game-info");
var startBtn = document.getElementById("start-btn");
var resetGameBtn = document.getElementById("reset-btn");
var resetScoreBtn = document.getElementById("reset-score-btn");
var finishGameBtn = document.getElementById("finish-game-btn");
var gameResultEl = document.getElementById("game-result");
var winnerPlayerEl = document.getElementById("winner-player");
var playerActiveInfoWrapEL = document.getElementById("player-active-info-wapper");

function startGame(){
  isPlaying=true
  resetGame()
  gameInfoWrapperEl.classList.remove("hide")
}
function resetGame() {
  activePlayer=1
  playerActiveInfoEl.innerHTML = activePlayer
  playerPosition = [[0,0,0],[0,0,0],[0,0,0]]
  for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = ""
  }
  playerOneScoreEl.innerHTML = score[0]
  playerTwoScoreEl.innerHTML = score[1]
  complateBoardCombine=[...complateBoardCombineDefault]
}
function resetScore() {
  score[0] = 0
  score[0] = 0
  resetGame();
}
function mark(e) {
  if(!isPlaying) return;
  const id = e.target.id;
  const [row, col] = id.replace("box-", "").split("-")
  if(playerPosition[row-1][col-1] !== 0) return;
  e.target.innerHTML = `<p class="mark">${activePlayer === 1 ? 'X' : 'O'}</p>`
  playerPosition[row-1][col-1] = activePlayer
  
  checkRusult()
}
function finishGame() {
  resetGame()
  playerActiveInfoWrapEL.classList.add("hide")
  winnerPlayerEl.innerHTML =  score[0] == score[1] 
                            ? "draw" 
                            : score[0] > score[1] 
                              ? "player 1"
                              : "player 2"
  gameResultEl.classList.remove("hide")
  setTimeout(() => {
    gameResultEl.classList.add("hide")
    winnerPlayerEl.innerHTML = ""
    playerActiveInfoWrapEL.classList.remove("hide")
    gameInfoWrapperEl.classList.add("hide")
    resetScore()
  }, 2000)
}

function checkRusult() {

  for(let r=0; r<3; r++) {
    for(let c=0; c<3; c++) {
      if(playerPosition[r][c] != activePlayer) continue;
      
      const colNum = c+(3*(r+1))-3
      for (let i = 0; i<complateBoardCombine.length; i++) {

        complateBoardCombine[i] = complateBoardCombine[i].replace(colNum, "")
        if(complateBoardCombine[i] != "") continue;

        completeGame()
        return;
      }
    }
  }
  
  complateBoardCombine=[...complateBoardCombineDefault]
  changePlayer()
}
function changePlayer() {
  if(activePlayer === 1) activePlayer = 2
  else activePlayer = 1
  playerActiveInfoEl.innerHTML = activePlayer
}
function completeGame(){
  ++score[activePlayer-1]
  playerOneScoreEl.innerHTML = score[0]
  playerTwoScoreEl.innerHTML = score[1]
  isPlaying=false
}
function init(){
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', mark);
  }
  startBtn.addEventListener('click', startGame)
  resetGameBtn.addEventListener('click', resetGame)
  resetScoreBtn.addEventListener('click', resetScore)
  finishGameBtn.addEventListener('click', finishGame)
}

init()
