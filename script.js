const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hearts = document.getElementById("hearts");
const music = document.getElementById("music");
const timerEl = document.getElementById("timer");

// ----- NO BUTTON ESCAPE -----
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 120) {
    moveNoButton();
  }
});

function moveNoButton() {
  const margin = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - margin;
  const maxY = window.innerHeight - noBtn.offsetHeight - margin;

  const x = Math.random() * maxX + margin;
  const y = Math.random() * maxY + margin;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
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
let time = 10;
const countdown = setInterval(() => {
  time--;
  timerEl.textContent = `00:${time < 10 ? "0" + time : time}`;

  if (time === 0) {
    clearInterval(countdown);
    explodeHearts();
  }
}, 1000);
