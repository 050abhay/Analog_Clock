// Select the <body> element in the HTML document
var body = document.querySelector("body");

// Get all elements with the class "diallines" and store them in an array-like object
var dialLines = document.getElementsByClassName('diallines');

// Get the first element with the class "clock" and store it in the variable clockEl
var clockEl = document.getElementsByClassName('clock')[0];

// Get the element with the class "mode-switch" and store it in the variable modeSwitch
var modeSwitch= document.querySelector(".mode-switch");

// Check if the mode is already set to "Dark Mode" in the browser's localStorage
if (localStorage.getItem("mode") === "Dark Mode") {
  // Add the "dark" class to the body element and change the text of modeSwitch to "Light Mode"
  body.classList.add("dark");
  modeSwitch.textContent = "Light Mode";
}

// Add a click event listener to the modeSwitch element
modeSwitch.addEventListener("click", () => {
  // Toggle the "dark" class on the body element (switch between dark and light mode)
  body.classList.toggle("dark");
  // Check if the "dark" class is currently present on the body element
  const isDarkMode = body.classList.contains("dark");
  // Set the text content of modeSwitch based on the presence of "dark" class
  modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  // Update the localStorage "mode" item based on the presence of "dark" class
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

// Loop from 1 to 59 (exclusive) to create 60 div elements with class "diallines" inside the clock element
for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  // Rotate each dialline element based on its index, creating a circular pattern
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

// Define a function named "clock"
function clock() {
  // Create an array with weekday names
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  // Create a new Date object to get the current date and time
  var d = new Date();
  // Extract hours, minutes, seconds, date, month, and year from the Date object
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  
  // Calculate the degree of rotation for hour, minute, and second hands
  var hDeg = h * 30 + m * (360/720);
  var mDeg = m * 6 + s * (360/3600);
  var sDeg = s * 6;

  // Get elements representing the hour, minute, and second hands of the clock
  var hEl = document.querySelector('.hour-hand');
  var mEl = document.querySelector('.minute-hand');
  var sEl = document.querySelector('.second-hand');
  var dateEl = document.querySelector('.date');
  var dayEl = document.querySelector('.day');
  
  // Get the name of the day corresponding to the current date
  var day = weekday[d.getDay()];
  
  // If the month is less than 9, add a leading zero to it (e.g., 08 instead of 8)
  if(month < 9) {
    month = "0" + month;
  }
  
  // Rotate the hour, minute, and second hands according to the calculated degrees
  hEl.style.transform = "rotate("+hDeg+"deg)";
  mEl.style.transform = "rotate("+mDeg+"deg)";
  sEl.style.transform = "rotate("+sDeg+"deg)";
  
  // Update the date and day elements with the current date and day
  dateEl.innerHTML = date+"/"+month+"/"+year;
  dayEl.innerHTML = day;
}

// Call the "clock" function every 100 milliseconds (10 times per second) to update the clock
setInterval("clock()", 100);
