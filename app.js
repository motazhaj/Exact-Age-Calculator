let calculateAgeButton = document.querySelector("#age-input button");
let userInput = document.getElementById("date-of-birth");
userInput.max = new Date().toISOString().split("T")[0];
let ageResult = document.getElementById("result");

calculateAgeButton.addEventListener("click", updateAge);

function updateAge() {
  calculateAge();

  setInterval(calculateAge, 1000);
}

function calculateAge() {
  let birthDate = new Date(userInput.value);

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
  

  let ageInDays = dayDiff + monthDiff * 30 + yearDiff * 365;

  console.log(ageInDays);
  console.log(currentHour)

}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
