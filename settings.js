/* for the settings panel, changing fonts, colors and time periods */
/*getting data */
// navigation handler when switching options
const times = {
    pomodoro: 25,
    short_break: 5,
    long_break: 15,
  },
  colors = {
    selected_color: "rgb(248, 112, 112)",
    red: "rgb(248, 112, 112)",
    blue: "rgb(112, 243, 248)",
    purple: "rgb(216, 129, 248)",
  },
  fonts = {
    kumbh_sans: "kumbh",
    roboto_slab: "roboto",
    space_mono: "space-mono",
  };

//navigation bar

const getPomodoro = document.getElementsByClassName("pomodoro")[0],
  getShortBreak = document.getElementsByClassName("shortbreak")[0],
  getLongBreak = document.getElementsByClassName("longbreak")[0];

const getCross = document.getElementById("close"),
  settingsPanel = document.getElementsByClassName("settingpanel")[0],
  settingsButton = document.getElementsByClassName("settings")[0];

// start, pause resume buttons

const getStartButton = document.getElementById("startbutton"),
  getPauseButton = document.getElementById("pausebutton"),
  getResumeButton = document.getElementById("resumebutton");

//fonts

const getKumbhFont = document.getElementById("kumbhbutton"),
  getRobotoFont = document.getElementById("robotobutton"),
  getMonoFont = document.getElementById("monobutton");

//colors

const [getRedButton, getBlueButton, getPurpleButton] = [
  document.getElementById("redbutton"),
  document.getElementById("bluebutton"),
  document.getElementById("purplebutton"),
];

/* apply button */

const getApplyButton = document.getElementsByClassName("apply")[0];

/* pomodoro */

const pomodoroTextBox = document.getElementById("pomodoro-textbox"),
  pomodoroArrowUp = document.getElementById("pomodoro-arrow-up"),
  pomodoroArrowDown = document.getElementById("pomodoro-arrow-down");

const shortBreakTextBox = document.getElementById("shortbreak-textbox"),
  shortBreakArrowUp = document.getElementById("shortbreak-arrow-up"),
  shortBreakArrowDown = document.getElementById("shortbreak-arrow-down");

const longBreakTextBox = document.getElementById("longbreak-textbox"),
  longBreakArrowUp = document.getElementById("longbreak-arrow-up"),
  longBreakArrowDown = document.getElementById("longbreak-arrow-down");

/* listener functionality */

settingsButton.addEventListener("click", () => {
  settingsPanel.style.display = "block";
});
getCross.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

/* pomodoro arrows */

pomodoroArrowUp.addEventListener("click", () => {
  times.pomodoro++;
  pomodoroTextBox.innerHTML = `${times.pomodoro}`;
});
pomodoroArrowDown.addEventListener("click", () => {
  if (times.pomodoro > 0) {
    times.pomodoro--;
  }

  pomodoroTextBox.innerHTML = `${times.pomodoro}`;
});

/* shortBreak arrows */

shortBreakArrowUp.addEventListener("click", () => {
  times.short_break++;
  shortBreakTextBox.innerHTML = `${times.short_break}`;
});
shortBreakArrowDown.addEventListener("click", () => {
  if (times.short_break > 0) {
    times.short_break--;
  }

  shortBreakTextBox.innerHTML = `${times.short_break}`;
});
/* longBreak arrows */

longBreakArrowUp.addEventListener("click", () => {
  times.long_break++;
  longBreakTextBox.innerHTML = `${times.long_break}`;
});
longBreakArrowDown.addEventListener("click", () => {
  if (times.long_break > 0) {
    times.long_break--;
  }

  longBreakTextBox.innerHTML = `${times.long_break}`;
});
/* inputs */
pomodoroTextBox.innerHTML = `${times.pomodoro}`;
shortBreakTextBox.innerHTML = `${times.short_break}`;
longBreakTextBox.innerHTML = `${times.long_break}`;

//fonts handler

const fontElements = [getKumbhFont, getRobotoFont, getMonoFont];
const classNames = ["kumbh", "roboto", "space-mono"];

fontElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    fontElements.forEach((font) => font.classList.remove("checked"));
    element.classList.add("checked");

    document.body.classList.remove(...classNames);
    document.body.classList.add(classNames[index]);

    [
      getPomodoro,
      getShortBreak,
      getLongBreak,
      getStartButton,
      getPauseButton,
      getResumeButton,
    ].forEach((button) => {
      button.classList.remove(...classNames);
      button.classList.add(classNames[index]);
    });
  });
});
/* apply button pressed */
getApplyButton.addEventListener("click", () => {
  settingsPanel.style.display = "none";
});

const colorElements = [getRedButton, getBlueButton, getPurpleButton];

//colors match the color elements above in order
const colorPalette = [
  "rgb(248, 112, 112)",
  "rgb(112, 243, 248)",
  "rgb(216, 129, 248)",
];
let chosenColor = colorPalette[0];

colorElements.forEach((color, index) =>
  color.addEventListener("click", () => {
    colors.selected_color = colorPalette[index];
    colorElements.forEach((color) =>
      color.getElementsByTagName("span")[0].classList.remove("ticked")
    );
    color.getElementsByTagName("span")[0].classList.add("ticked");
    document.getElementsByClassName("selected")[0].style.backgroundColor =
      colorPalette[index];
    chosenColor = colorPalette[index];
    getApplyButton.style.backgroundColor = colorPalette[index];
  })
);

export {
  times,
  colors,
  getPomodoro,
  getShortBreak,
  getLongBreak,
  getStartButton,
  getResumeButton,
  getPauseButton,
  chosenColor,
};
