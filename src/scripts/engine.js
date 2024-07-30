const state = {
  view:{
    squares: document.querySelectorAll(".square"),
    lives: document.querySelector("#live"),
    enemy: document.querySelector(".enemy"),
    timeleft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values:{
    lives: 3,    
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions:{
    timerId: setInterval(randomSquare, 1000),
    countDonwTimerId: setInterval(countDonw, 1000),
  }
};

function countDonw(){  
  state.values.currentTime--;
  state.view.timeleft.textContent = state.values.currentTime;
  
  if(state.values.currentTime <= 0){   
    livesResult();
  }
 
}

function livesResult(){
  
  if(state.values.result < 2 && state.view.lives.textContent >= 1){
    state.view.lives.textContent--
    alert(`O tempo acabou! Você perdeu uma vida, seu resultado foi: ${state.values.result}`)
    state.values.currentTime = 60;
    state.values.result = 0;
  } else if(state.values.result < 2 && state.view.lives.textContent <= 0){
    clearInterval(state.actions.countDonwTimerId);
    clearInterval(state.actions.timerId);  
    alert(`Você Morreuuuuuuu! Seus pontos foram ${state.values.result}. Fim da linha!`);
    
  } else {
    alert(`Aeeee você fez: ${state.values.result} pontos. Parabéns!`)
    state.values.currentTime = 60;
    state.values.result = 0;
  }

  state.view.score.textContent = 0
}

function playSound(audioName){
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare(){  
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}
/*
function moveEnemy(){
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}
*/

function addListenerHitBox(){
  state.view.lives.textContent = 3;
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition){
        state.values.result += 1;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit')
      }
    })
  });
  
}

function initialize(){
  // moveEnemy();
  addListenerHitBox();
}

initialize();