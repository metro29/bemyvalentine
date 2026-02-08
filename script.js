const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hearts = document.getElementById("hearts");
const music = document.getElementById("music");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message"); // message div

// ----- NO BUTTON WIGGLE -----
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 120) {
    wiggleNo();
  }
});

function wiggleNo() {
  const maxShift = 50; // max pixels to move in any direction

  // Get current position
  let currentX = noBtn.offsetLeft;
  let currentY = noBtn.offsetTop;

  // Random small shift
  const shiftX = (Math.random() - 0.5) * maxShift; // -25 to +25
  const shiftY = (Math.random() - 0.5) * maxShift; // -25 to +25

  // Clamp inside window
  const margin = 20;
  const newX = Math.min(Math.max(currentX + shiftX, margin), window.innerWidth - noBtn.offsetWidth - margin);
  const newY = Math.min(Math.max(currentY + shiftY, margin), window.innerHeight - noBtn.offsetHeight - margin);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

// ----- HEART EXPLOSION -----
function explodeHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("span");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}

// ----- YES BUTTON -----
yesBtn.addEventListener("click", () => {
  music.play();
  explodeHearts();
  document.querySelector(".container").innerHTML =
    "<h1>💘 SHE SAID YES 💘</h1><p>Best Valentine ever.</p>";
});

// ----- TIMER -----
let time = 15;
const countdown = setInterval(() => {
  time--;
  timerEl.textContent = `00:${time < 15 ? "0" + time : time}`;

  if (time === 0) {
    clearInterval(countdown);

    explodeHearts();

    // Show rejection message
    messageEl.innerHTML = "<h1>Rejected 💔</h1>";
    messageEl.style.fontSize = "2rem";
    messageEl.style.marginTop = "20px";
    messageEl.style.color = "#e63946";
  }
}, 1000);
