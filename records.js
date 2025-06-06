window.onload = function () {
    const name = localStorage.getItem('playerName') || 'ناشناس';
    const phone = localStorage.getItem('playerPhone') || '---';
    const score = parseInt(localStorage.getItem('playerScore')) || 0;
  
    // نمایش مشخصات کاربر
    document.getElementById('playerName').textContent = name;
    document.getElementById('playerPhone').textContent = phone;
    document.getElementById('playerScore').textContent = score;
  
    // گیف پول بر اساس امتیاز (مثلاً هر 10 امتیاز = 1 سکه)
    const gift = Math.floor(score / 10);
    document.getElementById('playerGift').textContent = gift;
  
    // نمایش جدول همه رکوردها
    const tableBody = document.getElementById('scoreTableBody');
    const scores = JSON.parse(localStorage.getItem('allScores')) || [];
  
    scores.sort((a, b) => b.score - a.score);
  
    scores.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.score}</td>
      `;
      tableBody.appendChild(row);
    });
  };
  
  function restartGame() {
    localStorage.removeItem('played'); // اجازه بازی مجدد
    window.location.href = 'index.html';
  }
  
  function inviteFriends() {
    alert("به‌زودی امکان دعوت دوستان فعال خواهد شد!");
  }
  