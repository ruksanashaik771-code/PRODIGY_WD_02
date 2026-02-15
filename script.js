let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const statusText = document.getElementById("status");

function formatTime(time) {
    const ms = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").onclick = () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);

        running = true;
        statusText.textContent = "RUNNING";
        statusText.className = "status running";
    }
};

document.getElementById("pause").onclick = () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;

        statusText.textContent = "PAUSED";
        statusText.className = "status paused";
    }
};

document.getElementById("reset").onclick = () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    laps.innerHTML = "";
    updateDisplay();

    statusText.textContent = "STOPPED";
    statusText.className = "status stopped";
};

document.getElementById("lap").onclick = () => {
    if (!running) return;

    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    laps.prepend(li);
};

updateDisplay();
