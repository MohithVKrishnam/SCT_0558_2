let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const displayMilliseconds = document.getElementById("milliseconds");
const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const millisecondHand = document.getElementById("millisecond-hand");
const lapList = document.getElementById("lap-list");

// Start the stopwatch
function startStopwatch() {
  if (!timer) {
    timer = setInterval(() => {
      milliseconds += 10;

      if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
      }

      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      // Update digital display
      displayMinutes.textContent = String(minutes).padStart(2, "0");
      displaySeconds.textContent = String(seconds).padStart(2, "0");
      displayMilliseconds.textContent = String(milliseconds / 10).padStart(2, "0");

      // Update analog hands
      updateClockHands();
    }, 10);
  }
}

// Update the analog clock hands
function updateClockHands() {
  const secondRotation = (seconds / 60) * 360;
  const minuteRotation = (minutes / 60) * 360;
  const millisecondRotation = (milliseconds / 1000) * 360;

  secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
  millisecondHand.style.transform = `translateX(-50%) rotate(${millisecondRotation}deg)`;
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(timer);
  timer = null;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timer);
  timer = null;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  displayMinutes.textContent = "00";
  displaySeconds.textContent = "00";
  displayMilliseconds.textContent = "00";

  secondHand.style.transform = `translateX(-50%) rotate(0deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(0deg)`;
  millisecondHand.style.transform = `translateX(-50%) rotate(0deg)`;
}

// Add a lap
function addLap() {
  const lap = document.createElement("li");
  lap.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds / 10).padStart(2, "0")}`;
  lapList.appendChild(lap);
}

// Event Listeners for buttons
document.getElementById("start-btn").addEventListener("click", startStopwatch);
document.getElementById("pause-btn").addEventListener("click", pauseStopwatch);
document.getElementById("reset-btn").addEventListener("click", resetStopwatch);
document.getElementById("lap-btn").addEventListener("click", addLap);

// Light/Dark Mode Toggle
const toggleButton = document.getElementById("toggle-mode");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
