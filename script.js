const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const hitBox = document.getElementById('hitBox');

let timeLeft = 30;
let score = 0;
let gameInterval;
let shapeInterval;

const shapes = [
  {shape: '●', points: 1, color: 'green'},
  {shape: '■', points: 2, color: 'blue'},
  {shape: '▲', points: 3, color: 'red'}
];

function showShape() {
  hitBox.innerHTML = ''; // پاک کردن شکل قبلی

  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const div = document.createElement('div');
  div.textContent = shape.shape;
  div.style.color = shape.color;
  div.style.position = 'absolute';

  // جایگاه کاملاً تصادفی داخل hitBox
  const shapeSize = 100;
const maxX = hitBox.clientWidth - shapeSize;
const maxY = hitBox.clientHeight - shapeSize;
const x = Math.floor(Math.random() * maxX);
const y = Math.floor(Math.random() * maxY);

div.style.left = `${x}px`;
div.style.top = `${y}px`;
div.style.fontSize = shapeSize + 'px';
  
  div.style.cursor = 'pointer';

  div.onclick = () => {
    score += shape.points;
    scoreEl.textContent = score;
    // بعد کلیک سریع شکل جدید بیاد (اما چون 0.8 ثانیه خودکار عوض میشه، نیاز نیست اینجا صدا کنیم)
    // showShape();
  };

  hitBox.appendChild(div);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(shapeInterval); // توقف شکل های تصادفی

  alert(`بازی تمام شد!\nامتیاز شما: ${score}`);

  // ذخیره رکورد
  const playerName = localStorage.getItem('playerName');
  const playerPhone = localStorage.getItem('playerPhone');

  let allScores = JSON.parse(localStorage.getItem('allScores') || '[]');
  allScores.push({name: playerName, phone: playerPhone, score: score});
  localStorage.setItem('allScores', JSON.stringify(allScores));
  localStorage.setItem('playerScore', score);

  localStorage.setItem('played', 'yes');

  window.location.href = 'records.html';
}

function startGame() {
  if(localStorage.getItem('played') === 'yes'){
    alert('شما قبلاً بازی کرده‌اید.');
    window.location.href = 'records.html';
    return;
  }

  timeLeft = 30;
  score = 0;
  timerEl.textContent = timeLeft;
  scoreEl.textContent = score;

  showShape();

  // تایمر شمارش معکوس بازی
  gameInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // هر 0.8 ثانیه شکل جدید
  shapeInterval = setInterval(() => {
    showShape();
  }, 500);
}

window.onload = startGame;
