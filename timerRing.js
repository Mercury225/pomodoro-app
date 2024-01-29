/* establishing the canvas and context for 2d drawing tools */
const canvas = document.getElementById("timerRing");
const context = canvas.getContext("2d");

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
/* asthetics for the circle */

context.strokeStyle = colors.red;
context.lineWidth = "30";
context.lineCap = "round";

/* set the duration of the timer here, conversion from minutes to seconds, with a counter (count) to count up in seconds starting at 0, Full circle circumference is 2 pi*/
const timeInMinutes = 15;
const timeInSeconds = timeInMinutes * 60;
let count = 0;
const fullCircle = 2 * Math.PI;

/* here i am taking a percentage of the fullCircle calculated by the ratio between the number of seconds that have elasped and the total seconds for the timer */
const convertToRadians = (seconds) => {
  return (seconds / timeInSeconds) * fullCircle;
};

/* then i'm adding the percentage onto the start of the circle (at -1/2 pi radians)*/

const addRadiansToOrigin = (seconds) => {
  return (-1 / 2) * Math.PI + convertToRadians(seconds);
};

/* this function is placed into setInterval to re-render the canvas, it redraws the arc every second */
const redrawCircle = (count) => {
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

/* listeners for the buttons to pause/resume the timer*/

document.getElementById("resumebutton").addEventListener("click", () => {
  /* runs the timer function again with the saved timeStorage */

  timer(timeStorage);
});

/* placing the interval in a function allows me to recall it. This interval counts every second, and every second the count from 0 adds 1 and goes up until end time, with every second the circle is redrawn*/

let timer = (count) => {
  let timeInterval = setInterval(function () {
    /* once it finishes, the interval stops */
    if (count === timeInSeconds) {
      clearInterval(timeInterval);
    }
    /* when the pause button is pressed, the count is stored and the interval stops until the resume is clicked*/
    document.getElementById("pausebutton").addEventListener("click", () => {
      /* i'm learnt there is no need to initialise the variable */
      timeStorage = count;
      clearInterval(timeInterval);
    });
    /* counts up by 1 */
    count = count + 1;
    /* circle redrawn */
    redrawCircle(count);
    /* time display changed every second */
    document.getElementById("time").innerHTML = timeDisplay(count);
  }, 1000);
};
/* starts at 0 */
timer(0);
