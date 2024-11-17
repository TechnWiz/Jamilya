document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("heartsCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  const colors = ["#FF69B4", "#FF1493", "#DB7093", "#FFC0CB"];

  function createHeart() {
    const spawnEdge = Math.floor(Math.random() * 4); // Случайное направление (0-3)
    let x, y, dx, dy;

    if (spawnEdge === 0) {
      // Сверху
      x = Math.random() * canvas.width;
      y = -20;
      dx = Math.random() * 2 - 1;
      dy = Math.random() * 2 + 2; // Увеличена скорость вниз
    } else if (spawnEdge === 1) {
      // Снизу
      x = Math.random() * canvas.width;
      y = canvas.height + 20;
      dx = Math.random() * 2 - 1;
      dy = Math.random() * -2 - 2; // Увеличена скорость вверх
    } else if (spawnEdge === 2) {
      // Слева
      x = -20;
      y = Math.random() * canvas.height;
      dx = Math.random() * 2 + 2; // Увеличена скорость вправо
      dy = Math.random() * 2 - 1;
    } else {
      // Справа
      x = canvas.width + 20;
      y = Math.random() * canvas.height;
      dx = Math.random() * -2 - 2; // Увеличена скорость влево
      dy = Math.random() * 2 - 1;
    }

    return {
      x,
      y,
      size: Math.random() * 20 + 10,
      dx,
      dy,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    };
  }

  function drawHeart(heart) {
    ctx.beginPath();
    const x = heart.x;
    const y = heart.y;
    const size = heart.size;

    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x - size / 2,
      y - size / 2,
      x - size,
      y + size / 3,
      x,
      y + size
    );
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fillStyle = `rgba(${parseInt(heart.color.slice(1, 3), 16)}, ${parseInt(
      heart.color.slice(3, 5),
      16
    )}, ${parseInt(heart.color.slice(5, 7), 16)}, ${heart.opacity})`;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart, index) => {
      heart.x += heart.dx;
      heart.y += heart.dy;
      heart.opacity -= 0.01; // Уменьшение прозрачности

      // Удаляем сердечки, если они исчезли
      if (
        heart.opacity <= 0 ||
        heart.x < -50 ||
        heart.x > canvas.width + 50 ||
        heart.y < -50 ||
        heart.y > canvas.height + 50
      ) {
        hearts.splice(index, 1);
      } else {
        drawHeart(heart);
      }
    });

    requestAnimationFrame(animate);
  }

  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      hearts.push(createHeart());
    }
  }, 100); // Чаще добавляем сердечки

  animate();
});