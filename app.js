let calculateAgeButton = document.querySelector("#age-input button");
let userInput = document.getElementById("date-of-birth");
userInput.max = new Date().toISOString().split("T")[0];
let ageResult = document.getElementById("result");

calculateAgeButton.addEventListener("click", calculateAge);

function calculateAge() {
  let birthdate = new Date(userInput.value);

  let birthDay = birthdate.getDate();
  let birthMonth = birthdate.getMonth() + 1;
  let birthYear = birthdate.getFullYear();

  let today = new Date();

  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  let yearDiff = currentYear - birthYear;
  let dayDiff, monthDiff;

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
  console.log(userInput.value);
  console.log(yearDiff, monthDiff, dayDiff);
  ageResult.innerHTML = `You are: <span>${yearDiff}</span> years, <span>${monthDiff}</span> months and <span>${dayDiff}</span> days old`;
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
