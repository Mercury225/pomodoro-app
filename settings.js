/* for the settings panel, changing fonts, colors and time periods */
/*getting data */
// navigation handler when switching options
const times = {
    pomodoro: 25,
    short_break: 5,
    long_break: 15,
  },
  colors = {
    red: "rgb(248, 112, 112)",
    blue: "rgb(112, 243, 248)",
    purple: "rgb(216, 129, 248)",
  },
  fonts = {
    kumbh_sans: "kumbh",
    roboto_slab: "roboto",
    space_mono: "space-mono",
  };

const getCross = document.getElementById("close"),
  settingsPanel = document.getElementsByClassName("settingpanel")[0],
  settingsButton = document.getElementsByClassName("settings")[0];

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
  times.pomodoro--;
  pomodoroTextBox.innerHTML = `${times.pomodoro}`;
});

/* shortBreak arrows */

shortBreakArrowUp.addEventListener("click", () => {
  times.short_break++;
  shortBreakTextBox.innerHTML = `${times.short_break}`;
});
shortBreakArrowDown.addEventListener("click", () => {
  times.short_break--;
  shortBreakTextBox.innerHTML = `${times.short_break}`;
});
/* longBreak arrows */

longBreakArrowUp.addEventListener("click", () => {
  times.long_break++;
  longBreakTextBox.innerHTML = `${times.long_break}`;
});
longBreakArrowDown.addEventListener("click", () => {
  times.long_break--;
  longBreakTextBox.innerHTML = `${times.long_break}`;
  console.log(times);
});
/* inputs */
pomodoroTextBox.innerHTML = `${times.pomodoro}`;
shortBreakTextBox.innerHTML = `${times.short_break}`;
longBreakTextBox.innerHTML = `${times.long_break}`;

export { times, colors };
