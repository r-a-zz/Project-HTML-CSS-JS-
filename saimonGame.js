let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

const h2 = document.querySelector("h2");

// Start the game on any keypress
document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        level = 0;
        h2.innerText = "Level " + level;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 500);
}

// Move to the next level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Choose a random button and flash it
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    flashSequence();
}

// Flash the entire sequence up to the current level
function flashSequence() {
    let index = 0;
    const interval = setInterval(function() {
        const color = gameSeq[index];
        const btn = document.getElementById(color);
        gameFlash(btn);
        index++;

        if (index >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);  // Adjust speed of flashing sequence here
}

// Check the user’s sequence input
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // Check if the user's sequence matches the game sequence so far
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game over logic
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}

function btnPress() {
    if (!started) return; // Ignore presses if game hasn't started

    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add click event listeners to each button
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

// Reset the game state
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
