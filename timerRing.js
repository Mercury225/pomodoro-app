/* establishing the canvas and context for 2d drawing tools */

/* dimensions for the canvas and circle */

const dimensions = {
  width: 1000,
  height: 1000,
  radius: 500,
};

const colors = {
  red: "rgb(248, 112, 112)",
  blue: "rgb(112, 243, 248)",
  purple: "rgb(216, 129, 248)",
};

/* here i am taking a percentage of the fullCircle calculated by the ratio between the number of seconds that have elasped and the total seconds for the timer */
const convertToRadians = (seconds) => {
  return (seconds / timeInSeconds()) * fullCircle;
};

/* then i'm adding the percentage onto the start of the circle (at -1/2 pi radians)*/

const addRadiansToOrigin = (seconds) => {
  return (-1 / 2) * Math.PI + convertToRadians(seconds);
};

/* this function is placed into setInterval to re-render the canvas, it redraws the arc every second */
const redrawCircle = (count) => {
  /*asthetics of the circle */
  const canvas = document.getElementById("timerRing");
  const context = canvas.getContext("2d");
  context.strokeStyle = colors.red;
  context.lineWidth = "30";
  context.lineCap = "round";

  context.beginPath();
  context.arc(
    dimensions.width / 2,
    dimensions.height / 2,
    400,
    (-1 / 2) * Math.PI,
    addRadiansToOrigin(count)
  );
  context.stroke();
};

const restartCanvas = () => {
  const timerRing = document.getElementById("timerRing");
  document.getElementsByClassName("bigcircle")[0].removeChild(timerRing);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "timerRing");
  canvas.setAttribute("width", "1000");
  canvas.setAttribute("height", "1000");

  document.getElementsByClassName("bigcircle")[0].appendChild(canvas);
};
/* this creates the HTML text to show the time 00:00, it takes in the seconds that have elasped and outputs the time in minutes:seconds */
const timeDisplay = (seconds) => {
  const convertToMinutes = seconds / 60;
  const justMinutes = Math.floor(convertToMinutes);
  const justSeconds = Math.round((convertToMinutes - justMinutes) * 60);
  const minutesClockDisplay = () => {
    if (justMinutes < 10) {
      return "0" + justMinutes;
    } else {
      return justMinutes;
    }
  };
  const secondssClockDisplay = () => {
    if (justSeconds < 10) {
      return "0" + justSeconds;
    } else {
      return justSeconds;
    }
  };
  return `${minutesClockDisplay()}:${secondssClockDisplay()}`;
};

/* navigation handler when switching options */
const times = {
  pomodoro: 25,
  short_break: 5,
  long_break: 15,
};

const pomodoroSelected = () => {
  return document
    .getElementsByClassName("selected")[0]
    .classList.contains("pomodoro");
};
const short_breakSelected = () => {
  return document
    .getElementsByClassName("selected")[0]
    .classList.contains("shortbreak");
};
const long_breakSelected = () => {
  return document
    .getElementsByClassName("selected")[0]
    .classList.contains("longbreak");
};

/* set the duration of the timer here, conversion from minutes to seconds, with a counter (count) to count up in seconds starting at 0, Full circle circumference is 2 pi*/
const timeInMinutes = () => {
  if (pomodoroSelected()) {
    return times.pomodoro;
  }
  if (short_breakSelected()) {
    return times.short_break;
  }
  if (long_breakSelected()) {
    return times.long_break;
  }
};
const timeInSeconds = () => {
  return timeInMinutes() * 60;
};
let count = 0;
const fullCircle = 2 * Math.PI;
/* listeners for the buttons to pause/resume the timer*/

const getPomodoro = document.getElementsByClassName("pomodoro")[0];
const getShortBreak = document.getElementsByClassName("shortbreak")[0];
const getLongBreak = document.getElementsByClassName("longbreak")[0];

getLongBreak.addEventListener("click", () => {
  getPomodoro.classList.remove("selected");
  getShortBreak.classList.remove("selected");
  getLongBreak.classList.add("selected");
});
getPomodoro.addEventListener("click", () => {
  getPomodoro.classList.add("selected");
  getShortBreak.classList.remove("selected");
  getLongBreak.classList.remove("selected");
});
getShortBreak.addEventListener("click", () => {
  getPomodoro.classList.remove("selected");
  getShortBreak.classList.add("selected");
  getLongBreak.classList.remove("selected");
});
document.getElementById("resumebutton").addEventListener("click", () => {
  /* runs the timer function again with the saved timeStorage */

  timer(timeStorage);
});

/* button handler, getting all the buttons */
const getStartButton = document.getElementById("startbutton");
const getPauseButton = document.getElementById("pausebutton");
const getResumeButton = document.getElementById("resumebutton");

/* listener for the start button */

/* placing the interval in a function allows me to recall it. This interval counts every second, and every second the count from 0 adds 1 and goes up until end time, with every second the circle is redrawn*/
getStartButton.addEventListener("click", () => {
  if (getStartButton.innerHTML === "Restart") {
    restartCanvas();
    getResumeButton.style.display = "none";
    document.getElementById("time").innerHTML = "00:00";
  }

  timer(0);

  getStartButton.innerHTML = "Restart";
  getStartButton.style.display = "none";
  getPauseButton.style.display = "block";
});

getPauseButton.addEventListener("click", () => {
  getPauseButton.style.display = "none";
  getStartButton.style.display = "block";
  getResumeButton.style.display = "block";
});

getResumeButton.addEventListener("click", () => {
  getPauseButton.style.display = "block";
  getStartButton.style.display = "none";
  getResumeButton.style.display = "none";
});
let timer = (count) => {
  let timeInterval = setInterval(function () {
    /* once it finishes, the interval stops */
    console.log(timeInSeconds());
    /* when the pause button is pressed, the count is stored and the interval stops until the resume is clicked*/
    document.getElementById("pausebutton").addEventListener("click", () => {
      /* i'm learnt there is no need to initialise the variable */
      timeStorage = count;
      clearInterval(timeInterval);
    });
    /* counts up by 1 */
    if (count === timeInSeconds()) {
      getStartButton.style.display = "block";
      getPauseButton.style.display = "none";
      clearInterval(timeInterval);
    } else {
      count = count + 1;
      redrawCircle(count);
    }

    /* circle redrawn */
    document.getElementById("time").innerHTML = timeDisplay(count);

    /* time display changed every second */
  }, 1000);
};
