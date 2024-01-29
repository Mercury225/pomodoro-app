const canvas = document.getElementById("timerRing");
const context = canvas.getContext("2d");

const remConstant = 16;

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
/* circle */

context.strokeStyle = colors.red;
context.lineWidth = "30";
context.lineCap = "round";

/* timer */
const timeInMinutes = 15;
const timeInSeconds = timeInMinutes * 60;
let count = 0;
const fullCircle = 2 * Math.PI;
const convertToRadians = (seconds) => {
  return (seconds / timeInSeconds) * fullCircle;
};

const addRadiansToOrigin = (seconds) => {
  return (-1 / 2) * Math.PI + convertToRadians(seconds);
};

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

/* listeners */

document.getElementById("resumebutton").addEventListener("click", () => {
  timer(timeStorage);
});

let timer = (count) => {
  let timeInterval = setInterval(function counter() {
    if (count === timeInSeconds) {
      clearInterval(timeInterval);
    }
    document.getElementById("pausebutton").addEventListener("click", () => {
      timeStorage = count;
      clearInterval(timeInterval);
    });

    count = count + 1;

    context.beginPath();
    context.arc(
      dimensions.width / 2,
      dimensions.height / 2,
      400,
      (-1 / 2) * Math.PI,
      addRadiansToOrigin(count)
    );
    context.stroke();
    document.getElementById("time").innerHTML = timeDisplay(count);
  }, 1000);
};
timer(0);
