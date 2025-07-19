// Elements
const countdownElement = document.getElementById('countdown-timer');
const sinceMetElement = document.getElementById('since-timer');

// 🗓 Dates
const firstMetDate = new Date("2023-10-30"); // when you first met
const nextAnniversary = new Date("2025-08-20"); // next anniversary

function updateTimers() {
  const now = new Date();

  // ❤️ Time since first met
  const diffSince = now - firstMetDate;

  const daysSince = Math.floor(diffSince / (1000 * 60 * 60 * 24));
  const hoursSince = Math.floor((diffSince / (1000 * 60 * 60)) % 24);
  const minutesSince = Math.floor((diffSince / (1000 * 60)) % 60);
  const secondsSince = Math.floor((diffSince / 1000) % 60);

  sinceMetElement.textContent = `${daysSince}d ${hoursSince}h ${minutesSince}m ${secondsSince}s`;

  // 🎉 Countdown to next anniversary
  const diffCountdown = nextAnniversary - now;

  if (diffCountdown <= 0) {
    countdownElement.textContent = "🎉 Happy Anniversary Ko! 💖";
  } else {
    const days = Math.floor(diffCountdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffCountdown / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffCountdown / (1000 * 60)) % 60);
    const seconds = Math.floor((diffCountdown / 1000) % 60);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

// Update every second
setInterval(updateTimers, 1000);
updateTimers();


const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let hearts = [];
for (let i = 0; i < 50; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    opacity: 0.3 + Math.random() * 0.7  // keep hearts visible but soft
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    ctx.globalAlpha = heart.opacity;
    ctx.fillStyle = "rgba(255, 182, 193, 0.7)"; // soft pink

    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(heart.x + heart.size / 2, heart.y - heart.size / 2,
                      heart.x + heart.size, heart.y + heart.size / 3,
                      heart.x, heart.y + heart.size);
    ctx.bezierCurveTo(heart.x - heart.size, heart.y + heart.size / 3,
                      heart.x - heart.size / 2, heart.y - heart.size / 2,
                      heart.x, heart.y);
    ctx.fill();

    ctx.globalAlpha = 1; // reset opacity

    heart.y -= heart.speed;
    if (heart.y < -heart.size) {
      heart.y = canvas.height + heart.size;
      heart.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();


// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');

document.querySelectorAll('.gallery-image').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.remove('hidden');
  });
});
closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.add('hidden');
});

const loveNotes = [
  "You are my favorite chapter in this story. 🌸",
  "I fall in love with you more every single day. 💖",
  "Forever isn’t long enough with you. ✨"
];

let currentNoteIndex = 0;

function openDiary(index) {
  currentNoteIndex = index;
  document.getElementById('diaryText').textContent = loveNotes[currentNoteIndex];
  document.getElementById('diaryModal').style.display = 'flex';
}

function closeDiary() {
  document.getElementById('diaryModal').style.display = 'none';
}

function nextNote() {
  currentNoteIndex = (currentNoteIndex + 1) % loveNotes.length;
  document.getElementById('diaryText').textContent = loveNotes[currentNoteIndex];
}

function prevNote() {
  currentNoteIndex = (currentNoteIndex - 1 + loveNotes.length) % loveNotes.length;
  document.getElementById('diaryText').textContent = loveNotes[currentNoteIndex];
}
