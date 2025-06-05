const startBtn = document.getElementById('startBtn');
const message = document.getElementById('message');
const target = document.getElementById('target');
const result = document.getElementById('result');

let startTime;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  message.textContent = 'منتظر باش...';
  result.textContent = '';
  target.classList.add('hidden');

  const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 ثانیه
  setTimeout(() => {
    target.classList.remove('hidden');
    message.textContent = 'بزن!';
    startTime = new Date().getTime();
  }, delay);
});

target.addEventListener('click', () => {
  const reactionTime = new Date().getTime() - startTime;
  target.classList.add('hidden');
  message.textContent = 'برای شروع مجدد دکمه رو بزن';
  result.textContent = `⏱ زمان واکنش شما: ${reactionTime} میلی‌ثانیه`;
  startBtn.disabled = false;
});
