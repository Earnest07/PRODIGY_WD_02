const playBtnDiv = document.querySelector(".play-btn-div");
const playBtnIcon = document.querySelector(".play-btn-icon");
const timingElements = document.querySelectorAll(".timing .number");
const resetLapButton = document.querySelector(".reset-lap");
const lapBtn = document.querySelector(".lap");
const contain = document.querySelector(".contain");
const table = document.getElementById("lap-table");
const lapTableBody = document.getElementById("lap-table-body");
const mainBody = document.querySelector(".main-body");

let isLapTableThere = false;
let lapPointer = 0;
let pauseBtnIcon;
let newArray = [];

let isRunning = false;
let stopWatch;
let totalSeconds = 137776;
let array;
let lapCount = 0;

const startTimer = () => {
  stopWatch = setInterval(() => {
    totalSeconds++;

    let days = Math.floor(totalSeconds / (60 * 60 * 24));
    let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    timingElements[0].textContent = days < 10 ? `0${days}` : days;
    timingElements[1].textContent = hours < 10 ? `0${hours}` : hours;
    timingElements[2].textContent = minutes < 10 ? `0${minutes}` : minutes;
    timingElements[3].textContent = seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(stopWatch);
};

playBtnDiv.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    isRunning = true;
    playBtnIcon.innerHTML = "&#9616;&#9616;";
    playBtnIcon.classList.remove("play-btn-icon");
    playBtnIcon.classList.add("pause-btn-icon2");
    playBtnIcon.style.transform = "";
    pauseBtnIcon = document.querySelector(".pause-btn-icon2");

    isLapTableThere = true;
  } else {
    pauseTimer();
    isRunning = false;
    pauseBtnIcon.style.transform = "";
    playBtnIcon.innerHTML = "&#9658;"; // Change pause icon to play icon
  }
});

const resetTimer = () => {
  timingElements[0].textContent = "00";
  timingElements[1].textContent = "00";
  timingElements[2].textContent = "00";
  timingElements[3].textContent = "00";
};

resetLapButton.addEventListener("click", () => {
  resetTimer();
  pauseTimer();
  newArray = [];
  if (isRunning) {
    isRunning = !isRunning;
    playBtnIcon.innerHTML = "&#9658;";
  }
  lapTableBody.innerHTML = "";
  lapPointer = 0;
  table.classList.add("d-none");

  contain.classList.add("contain");
  contain.classList.remove("contain2");

  timingElements[0].classList.add("number");
  timingElements[0].classList.remove("number2");

  timingElements[1].classList.add("number");
  timingElements[1].classList.remove("number2");

  timingElements[2].classList.add("number");
  timingElements[2].classList.remove("number2");

  timingElements[3].classList.add("number");
  timingElements[3].classList.remove("number2");

  playBtnDiv.classList.add("play-btn-div");
  playBtnDiv.classList.remove("play-btn-div2");
});

const countLap = () => {
  lapCount++;
  console.log(newArray.length, lapCount);
  newArray.push({
    day: timingElements[0].textContent,
    hour: timingElements[1].textContent,
    min: timingElements[2].textContent,
    sec: timingElements[3].textContent,
  });
  console.log(newArray);

  const row = document.createElement("tr");
  row.innerHTML = `
        <th scope="row" class="table-body-color">${newArray.length}</th>
        <td class="table-body-color">${newArray[lapPointer].day}</td>
        <td class="table-body-color">${newArray[lapPointer].hour}</td>
        <td class="table-body-color">${newArray[lapPointer].min}</td>
        <td class="table-body-color">${newArray[lapPointer].sec}</td>
    `;
  lapTableBody.appendChild(row);
  lapPointer++;

  if (lapCount > 10) {
    lapTableBody.classList.add("scrollable");
  }
};

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    countLap();
  }
  contain.classList.remove("contain");
  contain.classList.add("contain2");
  timingElements[0].classList.remove("number");
  timingElements[0].classList.add("number2");
  timingElements[1].classList.remove("number");
  timingElements[1].classList.add("number2");
  timingElements[2].classList.remove("number");
  timingElements[2].classList.add("number2");
  timingElements[3].classList.remove("number");
  timingElements[3].classList.add("number2");
  playBtnDiv.classList.remove("play-btn-div");
  playBtnDiv.classList.add("play-btn-div2");
  table.classList.remove("d-none");
  isLapTableThere = true;
});
