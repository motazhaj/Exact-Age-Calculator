let calculateAgeButton = document.querySelector("#age-input button");
let userInput = document.getElementById("date-of-birth");
userInput.max = new Date().toISOString().split("T")[0];

let ageResult = document.getElementById("result");
let ageResultSeconds = document.getElementById("result-seconds");
let ageResultMinutes = document.getElementById("result-minutes");
let ageResultHours = document.getElementById("result-hours");
let ageResultDays = document.getElementById("result-days");
let ageResultMonths = document.getElementById("result-months");
let ageResultYears = document.getElementById("result-years");

calculateAgeButton.addEventListener("click", updateAge);

let intervalId;

function updateAge() {
  clearInterval(intervalId);
  calculateAge();
  intervalId = setInterval(calculateAge, 1000);
}

function calculateAge() {
  let birthDate = new Date(userInput.value);

  if (isNaN(birthDate)) {
    ageResult.innerHTML = `Enter your <span>birthday</span> above`;
    ageResultSeconds.innerHTML = ``;
    ageResultMinutes.innerHTML = ``;
    ageResultHours.innerHTML = ``;
    ageResultDays.innerHTML = ``;
    ageResultMonths.innerHTML = ``;
    ageResultYears.innerHTML = ``;
    return;
  }

  let birthYear = birthDate.getFullYear();
  let birthMonth = birthDate.getMonth() + 1;
  let birthDay = birthDate.getDate();

  let today = new Date();

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDay = today.getDate();
  let currentHour = today.getHours();
  let currentMinute = today.getMinutes();
  let currentSecond = today.getSeconds();

  let yearDiff = currentYear - birthYear;
  let monthDiff, dayDiff, hourDiff, minuteDiff, secondDiff;

  if (currentMonth >= birthMonth) {
    monthDiff = currentMonth - birthMonth;
  } else {
    yearDiff--;
    monthDiff = 12 + currentMonth - birthMonth;
  }

  if (currentDay >= birthDay) {
    dayDiff = currentDay - birthDay;
  } else {
    monthDiff--;
    dayDiff = daysInMonth(birthYear, birthMonth) + currentDay - birthDay;
  }

  if (monthDiff < 0) {
    monthDiff = 11;
    yearDiff--;
  }

  hourDiff = currentHour;

  minuteDiff = currentMinute;

  secondDiff = currentSecond;

  ageResult.innerHTML = `You are: <span>${yearDiff}</span> years, <span>${monthDiff}</span> months, <span>${dayDiff}</span> days, <span>${hourDiff}</span> hours, <span>${minuteDiff}</span> minutes and <span>${secondDiff}</span> seconds  old`;

  let ageInSeconds = ageToSeconds(
    yearDiff,
    monthDiff,
    dayDiff,
    hourDiff,
    minuteDiff,
    secondDiff
  );

  ageResultSeconds.innerHTML = `You are: <span>${ageInSeconds.toLocaleString(
    "en"
  )}</span> seconds old`;

  ageResultMinutes.innerHTML = `You are: <span>${ageToMinutes(
    ageInSeconds
  )}</span> minutes old`;

  ageResultHours.innerHTML = `You are: <span>${ageToHours(
    ageInSeconds
  )}</span> hours old`;

  ageResultDays.innerHTML = `You are: <span>${ageToDays(
    ageInSeconds
  )}</span> days old`;

  ageResultMonths.innerHTML = `You are: <span>${ageToMonths(
    ageInSeconds
  )}</span> months old`;

  ageResultYears.innerHTML = `You are: <span>${ageToYears(
    ageInSeconds
  )}</span> years old`;
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function ageToSeconds(year, month, day, hour, minute, second) {
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInMonth = 30.44 * secondsInDay; // Approximation of an average month
  const secondsInYear = 365.25 * secondsInDay; // Approximation of an average year

  const totalSeconds =
    year * secondsInYear +
    month * secondsInMonth +
    day * secondsInDay +
    hour * secondsInHour +
    minute * secondsInMinute +
    second;

  return totalSeconds;
}

function ageToMinutes(seconds) {
  const totalMinutes = seconds / 60;
  return totalMinutes.toLocaleString("en", { maximumFractionDigits: 2 });
}

function ageToHours(seconds) {
  const totalHours = seconds / 3600;
  return totalHours.toLocaleString("en", { maximumFractionDigits: 2 });
}

function ageToDays(seconds) {
  const totalDays = seconds / 86400;
  return totalDays.toLocaleString("en", { maximumFractionDigits: 2 });
}

function ageToMonths(seconds) {
  const totalMonths = seconds / 2.628e6;
  return totalMonths.toLocaleString("en", { maximumFractionDigits: 2 });
}

function ageToYears(seconds) {
  const totalYears = seconds / 3.154e7;
  return totalYears.toLocaleString("en", { maximumFractionDigits: 2 });
}
