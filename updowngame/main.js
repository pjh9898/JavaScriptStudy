let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chanceArea");
let inputArea = document.getElementById("inputArea");
let playButton = document.getElementById("playButton");
let resetButton = document.getElementById("resetButton");

let RandomNum = "";
let chance = 5;
let history = [];
let gameover = false;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
inputArea.addEventListener("focus", function(){
    inputArea.value = "";
});

function makeRandomNum(){
    RandomNum = Math.floor(Math.random() * 100 + 1);
    console.log("정답", RandomNum);
}

function play(){
    if (history.includes(inputArea.value)) {
      console.log("이미 입력한 숫자입니다.");
      return;
    } else if (inputArea.value > 100 || inputArea.value < 1) {
      console.log("1~100사이의 숫자를 입력하세요.");
      return;
    }

    history.push(inputArea.value);

    if (RandomNum == inputArea.value) {
      resultArea.textContent = "정답!!";
    } else if (RandomNum > inputArea.value) {
      resultArea.textContent = "Up!";
    } else {
      resultArea.textContent = "Down!";
    }
    chance--;
    chanceArea.textContent = `남은찬스 ${chance}번!`

    if(chance == 0){
        playButton.disabled = true;
    }
}
function reset(){
    chance = 5;
    history = [];
    makeRandomNum();
    playButton.disabled = false;
    inputArea.value = "";
    resultArea.textContent = "이곳에 결과가 나옵니다";
    chanceArea.textContent = "남은찬스 5번";
}

makeRandomNum();