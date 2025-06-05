let startTime;
let player = null;

function startGame() {
  const name = document.getElementById('playerName').value.trim();
  const phone = document.getElementById('playerPhone').value.trim();

  if (!name || !phone) {
    alert("لطفاً نام و شماره تلفن را وارد کنید.");
    return;
  }

  player = { name, phone, score: 0 };
  localStorage.setItem("currentPlayer", JSON.stringify(player));

  document.getElementById("playerForm").style.display = "none";
  document.getElementById("game").style.display = "block";

  spawnShapeAfterDelay();
}

// تابع برای ظاهر کردن شکل در جای تصادفی بعد از زمان تصادفی
function spawnShapeAfterDelay() {
  const delay = Math.floor(Math.random() * 3000) + 1000; // 1 تا 4 ثانیه
  const gameArea = document.getElementById("gameArea");

  // پاک کردن شکل قبلی اگر بود
  gameArea.innerHTML = "";
  const shape = document.createElement("div");
  shape.id = "targetShape";

  // محاسبه موقعیت تصادفی داخل gameArea
  const maxX = gameArea.clientWidth - 50; // عرض شکل 50px
  const maxY = gameArea.clientHeight - 50;

  const posX = Math.floor(Math.random() * maxX);
  const posY = Math.floor(Math.random() * maxY);

  shape.style.left = posX + "px";
  shape.style.top = posY + "px";

  // شکل تا قبل از ظاهر شدن غیر فعال است
  shape.style.visibility = "hidden";

  gameArea.appendChild(shape);

  setTimeout(() => {
    shape.style.visibility = "visible";
    startTime = new Date().getTime();

    shape.addEventListener("click", () => {
      const reactionTime = new Date().getTime() - startTime;
      endGame(reactionTime);
    }, { once: true });
  }, delay);
}

// تابع فرمت زمان به صورت mm:ss.ms
function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = ms % 1000;

  return (
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    Math.floor(milliseconds / 10).toString().padStart(2, "0")
  );
}

function endGame(reactionTime) {
  player = JSON.parse(localStorage.getItem("currentPlayer"));
  player.score = 1000 - reactionTime;
  if (player.score < 0) player.score = 0;

  // ذخیره زمان به صورت عدد اصلی در رکورد برای مرتب‌سازی
  player.timeMs = reactionTime;

  // ذخیره در لیست رکوردها
  let scores = JSON.parse(localStorage.getItem("scoreboard")) || [];
  scores.push(player);

  // مرتب‌سازی بر اساس زمان (کمتر بهتر)
  scores.sort((a, b) => a.timeMs - b.timeMs);
  scores = scores.slice(0, 5);

  localStorage.setItem("scoreboard", JSON.stringify(scores));

  // نمایش جدول و زمان واکنش
  const topList = document.getElementById("topScores");
  topList.innerHTML = "";
  scores.forEach((p, index) => {
    topList.innerHTML += `<li>${index + 1}. ${p.name} - زمان واکنش: ${formatTime(p.timeMs)}</li>`;
  });

  const timeDisplay = document.getElementById("reactionTimeDisplay");
  timeDisplay.innerText = `زمان واکنش شما: ${formatTime(reactionTime)}`;

  // نمایش بخش رکورد
  document.getElementById("game").style.display = "none";
  document.getElementById("scoreboard").style.display = "block";
}

function restart() {
  location.reload();
}
