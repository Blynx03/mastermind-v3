// ******* SHOWING PLAY PAGE WITH ANIMATION  ********

setTimeout(function () {
  const curtainSound = new Audio("sound/cleartoplay.wav");
  curtainSound.play();
}, 200);

// generated colors container
setTimeout(function () {
  const genColorsBox = document.querySelector(".gen-colors-container");
  const genColorsBoxAppearingSound = new Audio("sound/whoosh thud 4sec.mp3");

  genColorsBox.style.visibility = "visible";
  genColorsBox.style.animation =
    "animate-gen-colors-container 1.5s ease-in forwards";

  genColorsBoxAppearingSound.play();
}, 3500);

// Pegs for the generated colors
setTimeout(function () {
  for (let i = 1; i <= 4; i++) {
    setTimeout(function () {
      const genColorsPegAppearingSound = new Audio("sound/thud.wav");
      let genColorsPeg = document.getElementById("gc" + i);
      genColorsPegAppearingSound.play();
      genColorsPeg.style.visibility = "visible";
      genColorsPeg.style.animation = "animate-gen-colors 0.2s ease-in forwards";
    }, 400 * (i + 1));
  }
}, 5500);

// showing body area
setTimeout(function () {
  const bodyAnimateSound = new Audio("sound/slide.wav");
  let anime = "";
  if (window.innerWidth <= 550) {
    anime = "animate-body-container2";
  } else if (window.innerWidth >= 551 && window.innerWidth <= 770) {
    anime = "animate-body-container3";
  } else {
    anime = "animate-body-container";
  }
  const bodyContainer = document.querySelector(".body-container");
  bodyContainer.style.animation = `${anime} 1s linear forwards`;
  bodyContainer.style.visibility = "visible";

  bodyAnimateSound.play();
}, 8000);

// showing line container

setTimeout(function () {
  const lineContainerAudio = new Audio("sound/glitch.wav");
  const lineContainer = document.querySelector(".line-container");
  const btnsContainer = document.querySelector(".btns-container");
  lineContainer.style["-webkit-animation"] =
    "animate-line-and-button-containers 1.8s linear forwards";
  btnsContainer.style["-webkit-animation"] =
    "animate-line-and-button-containers 1.8s linear forwards";
  lineContainerAudio.play();
}, 14100);

// removing animated line container and replacing it with an interactive one
setTimeout(function () {
  const lineContainer2 = document.querySelector(".line-container");
  lineContainer2.classList.replace("line-container", "line-container2");
  generateColors();
  play();
  // showGeneratedColors(); // remove when done
}, 14500);

// showing color choices pegs
setTimeout(function () {
  for (let i = 1; i <= 6; i++) {
    setTimeout(function () {
      const pegChoicesAppearingSound = new Audio("sound/spin3.wav");
      const colorsContainer = document.querySelector(".color" + i);
      // colorsContainer.classList.add("animatePeg" + i);
      colorsContainer.style.visibility = "visible";
      colorsContainer.style["-webkit-animation"] =
        "animate-color" + i + "-choice 2s linear forwards";
      pegChoicesAppearingSound.play();
    }, 400 * (i + 1));
  }
}, 8200);

// making color choices interactive due to forwards in animation
setTimeout(function () {
  for (let i = 1; i <= 6; i++) {
    const colorsContainer2 = document.querySelector(".color" + i);
    colorsContainer2.removeAttribute("style");
    colorsContainer2.classList.remove("color-choices");
    colorsContainer2.classList.add("color-choices2", "color-peg" + i);
  }
  const bodyContainer = document.querySelector(".body-container");
  bodyContainer.removeAttribute("style");
  if (window.innerWidth <= 550) {
    bodyContainer.style.width = "90vw";
  } else if (window.innerWidth <= 770 && window.innerWidth >= 551) {
    bodyContainer.style.width = "94vw";
  } else {
    bodyContainer.style.width = "80vw";
  }
  bodyContainer.classList.replace("body-container", "body-container2");
}, 14300);

// *******  MAIN PLAY PROGRAM  ********

const generatedColors = [];
let chosenColors = [];
const randomNumbers = [];
let count = 0;
let pegNum = 0;
let feedback = [];
let attempt = 1;
const numChoices = 6;

// sounds
const changeClickSound = new Audio("sound/changeclick.wav");
const choiceClickSound = new Audio("sound/choiceclick.wav");

function addListen(peg, handle) {
  peg.addEventListener("click", handle);
}

function removeListen(peg, handle) {
  peg.removeEventListener("click", handle);
}

// generating random colors
function generateColors() {
  for (let i = 0; i <= 3; i++) {
    randomNumbers.push(Math.floor(Math.random() * 6));
    switch (randomNumbers[i]) {
      case 0:
        generatedColors[i] = "red";
        break;
      case 1:
        generatedColors[i] = "blue";
        break;
      case 2:
        generatedColors[i] = "yellow";
        break;
      case 3:
        generatedColors[i] = "purple";
        break;
      case 4:
        generatedColors[i] = "aqua";
        break;
      case 5:
        generatedColors[i] = "orange";
        break;
    }
  }
}

function play() {
  const colorPegs = document.querySelectorAll(".color-choices2");
  // adding event listeners to the color choices pegs
  colorPegs.forEach((peg) => {
    addListen(peg, handleClick);
    // peg.addEventListener("click", handleClick);
  });
}

// Show generated colors
function showGeneratedColors() {
  let showAudio = new Audio("sound/show-win-peg.wav");
  for (let i = 0; i <= generatedColors.length; i++) {
    showAudio.play();
    let genPeg = document.getElementById("gc" + (i + 1));
    assignColors(generatedColors[i], genPeg);
  }
}

// assigning colors
function assignColors(color, peg) {
  switch (color) {
    case "red":
      peg.style.background = "rgba(255, 0, 0, 0.65)";
      break;
    case "blue":
      peg.style.background = "rgba(0, 0, 255, 0.65)";
      break;
    case "yellow":
      peg.style.background = "rgba(255, 255, 0, 0.85)";
      break;
    case "purple":
      peg.style.background = "rgba(123, 0, 123, 0.65)";
      break;
    case "aqua":
      peg.style.background = "rgba(0, 255, 255, 0.85)";
      break;
    case "orange":
      peg.style.background = "rgba(255, 165, 0, 0.85)";
      break;
  }
}

// putting colors in the body container
function handleClick(event) {
  const colorPegs = document.querySelectorAll(".color-choices2");
  choiceClickSound.play();

  count++;
  // console.log(event);
  chosenColors.push(event.target.attributes.text.value);
  const chosenPeg = document.querySelector(
    ".choice" + count + ".attempt" + attempt
  );

  assignColors(chosenColors[count - 1], chosenPeg);

  // handle corrections
  listenForCorrection();

  if (count === 4) {
    let chosenPegs = document.querySelectorAll(".attempt" + attempt);
    chosenPegs.forEach((peg) => {
      removeListen(peg, handleCorrections);
    });
    colorPegs.forEach((peg) => {
      removeListen(peg, handleClick);
    });

    checkAndShowFeedback();
  }
}

// assigning listener to certain chosen pegs
function listenForCorrection() {
  const pegChosen = document.querySelector(
    ".choice" + count + ".attempt" + attempt
  );
  addListen(pegChosen, handleCorrections);
  pegChosen.classList.add("peg:hover");
}

function handleCorrections(evnt) {
  const colorPegs = document.querySelectorAll(".color-choices2");

  changeClickSound.play();

  // console.log("count in handleCorrections = " + count);
  pegNum = parseInt(evnt.target.attributes.text.value); // gives the peg location to be replaced
  let pegChosen = document.querySelector(
    ".choice" + pegNum + ".attempt" + attempt
  );
  pegChosen.style.background = "transparent";

  let chosenPegs = document.querySelectorAll(".attempt" + attempt);
  // let pegChosenColors = document.querySelectorAll(".attempt" + attempt);
  // console.log("chosenPegs at handle correction = " + chosenPegs);
  chosenPegs.forEach((peg) => {
    removeListen(peg, handleCorrections);
  });

  colorPegs.forEach((peg) => {
    removeListen(peg, handleClick);
    addListen(peg, replaceNewPeg);
  });

  function replaceNewPeg(e) {
    const colorPegs = document.querySelectorAll(".color-choices2");
    choiceClickSound.play();

    console.log("count in replaceNewPeg = " + count);

    // let getId = e.target.id.slice(-1);
    // console.log("getId value under replaceNewPeg = " + getId);
    chosenColors[pegNum - 1] = e.target.attributes.text.value;

    assignColors(chosenColors[pegNum - 1], pegChosen);

    // let chosenPegs = document.querySelectorAll(".attempt" + attempt);
    for (let i = 0; i < count; i++) {
      console.log("chosenPegs [i] = " + i);
      chosenPegs[i].addEventListener("click", handleCorrections);
    }

    colorPegs.forEach((peg) => {
      removeListen(peg, replaceNewPeg);
      addListen(peg, handleClick);
    });
  }
}

function checkAndShowFeedback() {
  const feedResultSound = new Audio("sound/feedresult.wav");

  for (let i = 0; i < chosenColors.length; i++) {
    if (chosenColors[i] === generatedColors[i]) {
      feedback[i] = "black";
    } else if (generatedColors.includes(chosenColors[i])) {
      feedback[i] = "white";
    } else {
      feedback[i] = "transparent";
    }
  }

  feedResultSound.play();

  let randomPeg = [];
  let randomNum;
  // let randomNum = Math.floor(Math.random() * 4);
  //     console.log("random Num = " + randomNum);
  // randomPeg.push(randomNum)

  for (let j = 0; j < 4; j++) {
    randomNum = Math.floor(Math.random() * 4);

    if (randomPeg.includes(randomNum)) {
      j--;
    } else {
      randomPeg.push(randomNum);
    }
  }

  for (let l = 0; l < feedback.length; l++) {
    let feedPeg = document.querySelector(
      ".feed" + (l + 1) + ".feedresult" + attempt
    );
    feedPeg.style.background = feedback[randomPeg[l]];
    feedPeg.style.visibility = "visible";
    setTimeout(function () {
      feedPeg.style["-webkit-animation"] =
        "animate-feeds 500ms linear forwards";
    }, 100 * (l + 1));
  }

  // re-initializing variables

  if (feedback.includes("white") || feedback.includes("transparent")) {
    attempt++;
    chosenColors = [];
    feedback = [];
    count = 0;
    if (attempt > 10) {
      // change 1 to 10 when done debugging
      console.log("You lose!");
      tryAgain();
    } else {
      setTimeout(() => {
        createNewLine();
        play();
      }, 1500);
    }
  } else {
    setTimeout(() => {
      let winAudio = new Audio("sound/winsound.wav");
      winAudio.play();
    }, 1000);
    showGeneratedColors();
    animateLevelUpExplosion();
    console.log("You did it!");
  }
}

function animateLevelUpExplosion() {
  const levelContainer = document.querySelector(".body-container2");

  setTimeout(function () {
    const showLevelSound = new Audio("sound/level-up1.wav");
    showLevelSound.play();
    setTimeout(function () {
      levelContainer.classList.add("level-up");

      document.querySelectorAll(".chosen-color").forEach((color) => {
        color.style.animation = "animate-distort-disappear 2s linear forwards";
      });
      document.querySelectorAll(".feedbacks").forEach((feed) => {
        feed.style.animation = "animate-distort-disappear 2s linear forwards";
      });

      setTimeout(function () {
        levelContainer.classList.replace("body-container2", "body-container3");

        const newLevelContainer = document.querySelector(".body-container3");

        //removing elements in body container
        removeAllChildNodes(newLevelContainer);

        setTimeout(function () {
          const newDiv1 = document.createElement("DIV");
          const newDiv2 = document.createElement("DIV");
          const newBtnCont = document.createElement("DIV");
          const newBtn = document.createElement("BUTTON");
          const newContent1 = levelContainer.appendChild(newDiv1);
          const newContent2 = levelContainer.appendChild(newDiv2);
          const newBtnContainer = levelContainer.appendChild(newBtnCont);
          const newButton = newBtnContainer.appendChild(newBtn);

          newContent1.className = "level show-level";
          newContent1.textContent = "Level 4 Unlocked!";
          newContent2.className = "level level-description";
          newContent2.textContent =
            "Notable. Number of attempts will be lowered to eight(8) on this next level.";

          setTimeout(function () {
            newBtnContainer.className = "level-up-btn-container";
            newButton.className = "btn2 readyBtn";
            newButton.textContent = "Ready?";
            newButton.setAttribute("onclick", "loadNextLevel()");
          }, 1000);
        }, 200);
      }, 200);
    }, 3100);
  }, 2000);
}

function removeAllChildNodes(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function tryAgain() {
  setTimeout(function () {
    const colorsContainer = document.querySelector(".colors-container");
    const gameOverSound = new Audio("sound/gameover.wav");
    gameOverSound.play();
    showGeneratedColors();
    colorsContainer.style["-webkit-animation"] =
      "animate-disappear 2000ms linear forwards";
    setTimeout(function () {
      showTryAgainBtn();
    }, 1200);
  }, 1000);
}

function showTryAgainBtn() {
  setTimeout(function () {
    const btnsContainer = document.getElementById("buttons-container");
    const tryBtn = document.createElement("button");
    tryBtn.textContent = "Try Again";
    tryBtn.classList.add("btn", "try-again-btn");
    tryBtn.setAttribute("type", "button");
    tryBtn.setAttribute("onclick", "tryAgainClick()");

    btnsContainer.style["-webkit-animation"] =
      "animate-distort-disappear 2s linear forwards";

    setTimeout(function () {
      const showBtnsSound = new Audio("sound/glitch3.wav");
      btnsContainer.appendChild(tryBtn);
      btnsContainer.classList.replace("btns-container", "btns-container2");

      const buttons = document.querySelectorAll(".btn");
      buttons.forEach((button) => {
        button.classList.replace("btn", "btn2");
      });
      showBtnsSound.play();
      tryBtn.style.opacity = "1";
      btnsContainer.style["-webkit-animation"] =
        "animate-distort-appear 2s linear forwards";
    }, 1500);
  }, 1300);

  // setTimeout(function() {
  //     const mainPageBtn = document.querySelector(".main-page-btn");
  //     const howToBtn = document.querySelector(".how-to-play-btn");
  //     const tryAgainBtn = document.querySelector(".try-again-btn");

  //     mainPageBtn.style["-webkit-animation"] = "animate-main-btn 2s linear forwards";
  //     howToBtn.style["-webkit-animation"] = "animate-how-to-btn 2s linear forwards";
  //     tryAgainBtn.style["-webkit-animation"] = "animate-try-again-btn 2s linear forwards";
  // }, 2200);
}

// creating new line
function createNewLine() {
  const bodyContainer2 = document.querySelector(".body-container2");

  const newLineContainer = document.createElement("DIV");
  newLineContainer.className = "line-container2";
  newLineContainer.style.gridArea = "line" + attempt;
  const newChoicesContainer = document.createElement("DIV");
  newChoicesContainer.className = "choices-container";
  const newChoice1 = document.createElement("SPAN");
  newChoice1.className = "chosen-color choice1 attempt" + attempt;
  newChoice1.setAttribute("text", "1");
  newChoice1.textContent = "1";
  const newChoice2 = document.createElement("SPAN");
  newChoice2.className = "chosen-color choice2 attempt" + attempt;
  newChoice2.setAttribute("text", "2");
  newChoice2.textContent = "2";
  const newChoice3 = document.createElement("SPAN");
  newChoice3.className = "chosen-color choice3 attempt" + attempt;
  newChoice3.setAttribute("text", "3");
  newChoice3.textContent = "3";
  const newChoice4 = document.createElement("SPAN");
  newChoice4.className = "chosen-color choice4 attempt" + attempt;
  newChoice4.setAttribute("text", "4");
  newChoice4.textContent = "4";
  const newFeedbackContainer = document.createElement("DIV");
  newFeedbackContainer.className = "feedback-container";
  const newFeed1 = document.createElement("SPAN");
  newFeed1.textContent = "?";
  newFeed1.className = "feedbacks feed1 feedresult" + attempt;
  const newFeed2 = document.createElement("SPAN");
  newFeed2.textContent = "?";
  newFeed2.className = "feedbacks feed2 feedresult" + attempt;
  const newFeed3 = document.createElement("SPAN");
  newFeed3.textContent = "?";
  newFeed3.className = "feedbacks feed3 feedresult" + attempt;
  const newFeed4 = document.createElement("SPAN");
  newFeed4.textContent = "?";
  newFeed4.className = "feedbacks feed4 feedresult" + attempt;

  bodyContainer2.appendChild(newLineContainer);
  newLineContainer.appendChild(newChoicesContainer);
  newChoicesContainer.appendChild(newChoice1);
  newChoicesContainer.appendChild(newChoice2);
  newChoicesContainer.appendChild(newChoice3);
  newChoicesContainer.appendChild(newChoice4);
  newLineContainer.appendChild(newFeedbackContainer);
  newFeedbackContainer.appendChild(newFeed1);
  newFeedbackContainer.appendChild(newFeed2);
  newFeedbackContainer.appendChild(newFeed3);
  newFeedbackContainer.appendChild(newFeed4);
}

function mainClick() {
  clickSound();
  setTimeout(function () {
    window.location.replace("index.html");
  }, 500);
}

function howToClick() {
  clickSound();
  setTimeout(function () {
    window.location.replace("how-to-play.html");
  }, 500);
}

function tryAgainClick() {
  clickSound();
  setTimeout(function () {
    window.location.reload();
  }, 500);
}

function clickSound() {
  let clickSound = new Audio("sound/click.wav");
  clickSound.play();
}

function loadNextLevel() {
  clickSound();
  window.location.replace("level-four.html");
}

// Setting the footer
let year = new Date().getFullYear();
const footerNote = document.querySelector("footer");
footerNote.innerHTML =
  "The Dreamer " +
  year +
  '<span class="material-symbols-outlined rocket-icon">rocket_launch</span>';
