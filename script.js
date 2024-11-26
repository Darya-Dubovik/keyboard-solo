const word = document.querySelector(".word");
const words = ['apple', 'rose', 'moon', 'winner', 'happiness'];
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const wordMistakes = document.querySelector(".word-mistakes");
const timer = document.querySelector("#timer");
const str = timer.textContent.split(":");
let seconds = parseInt(str[0]) + parseInt(str[1]);

let timerId = setInterval(() => {
    seconds++;
    const minutes = parseInt(str[0]);
    const remainingSeconds = seconds % 60;
  
    timer.textContent = (`${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`);
    
    if(seconds >= 60) {
      clearInterval(timerId);
      alert('Время закончилось');
    };
  }, 1000);


function getRandomIndex() {
    return Math.floor(Math.random() * words.length);
};

let currentWord = words[getRandomIndex()];
let error = false;

function renderWord(currentWord) {
    word.innerHTML = currentWord.split("").map((char) => 
    `<span>${char}</span>`).join("");
};

renderWord(currentWord);

let index = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === currentWord[index]) {
        isSuccess();
    } else {
        isLoss();
    }

    if (index === currentWord.length) {
        if (!error) {
            correctCount.textContent = ++correctCount.textContent;
        } else {
            wrongCount.textContent = ++wrongCount.textContent;
        };
        
        setTimeout(isNewWord, 0);

    }
    });

function isSuccess() {
    word.children[index].classList.remove('w');
    word.children[index].classList.add('c');
    index++;
};

function isLoss() {
    word.children[index].classList.add('w');
    wordMistakes.textContent = ++wordMistakes.textContent;
    error=true;
};

function isNewWord() {
    checkNumber();
    currentWord = words[getRandomIndex()];
    renderWord(currentWord);
    index=0;
    error=false;
    wordMistakes.textContent = 0;
};

function checkNumber() {
    if (correctCount.textContent >= 5) {
        isFinished('Вы победили!');

    } else if (wrongCount.textContent >= 5) {
        isFinished('Увы..');
    };

};

function isFinished(message) {
    alert(message);
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    wordMistakes.textContent = 0;
};
