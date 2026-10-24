// 1. Initialize your variable
let count = 0;

// 2. Select elements from the DOM
const display = document.getElementById("count-display");
const decreaseBtn = document.getElementById("decrease-btn");
const resetBtn = document.getElementById("reset-btn");
const increaseBtn = document.getElementById("increase-btn");

// 3. Add event listeners and functions
increaseBtn.addEventListener("click", function () {
  count++;
  display.textContent = count;
});

decreaseBtn.addEventListener("click", function () {
  count--;
  display.textContent = count;
});

resetBtn.addEventListener("click", function () {
  count = 0;
  display.textContent = count;
});
