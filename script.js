// --- Fractal Tree Drawing ---
function drawFractalTree(ctx, startX, startY, length, angle, branchWidth, depth = 0, dynamic = false) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  if (length < 12) {
    ctx.restore();
    return;
  }

  const nextAngle = dynamic ? angle + Math.sin(Date.now() / 500 + depth) * 2 : angle;

  drawFractalTree(ctx, 0, -length, length * 0.7, nextAngle - 18, branchWidth * 0.7, depth + 1, true);
  drawFractalTree(ctx, 0, -length, length * 0.7, nextAngle + 18, branchWidth * 0.7, depth + 1, true);

  ctx.restore();
}

function animateFractal(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth || 300;
    canvas.height = canvas.offsetHeight || 300;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFractalTree(ctx, canvas.width / 2, canvas.height - 10, 80, 0, 10, 0, false);
    requestAnimationFrame(draw);
  }

  draw();
}

window.onload = () => {
  animateFractal('tree-canvas');
};


// --- Snowfall Animation ---
window.addEventListener("DOMContentLoaded", () => {
  const snowCanvas = document.getElementById('snow-canvas');
  if (!snowCanvas) return;
  const ctx = snowCanvas.getContext('2d');
  const W = snowCanvas.width;
  const H = snowCanvas.height;
  const numFlakes = 32;
  const flakes = [];

  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 2 + Math.random() * 2,
      d: 1 + Math.random() * 1.5,
      angle: Math.random() * Math.PI * 2
    });
  }

  function drawSnowflake(flake) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(230,255,255,0.78)";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < flakes.length; i++) {
      let f = flakes[i];
      drawSnowflake(f);
      f.y += f.d;
      f.x += Math.sin(f.angle) * 0.1;
      f.angle += 0.01;
      if (f.y > H) {
        f.y = -f.r;
        f.x = Math.random() * W;
      }
      if (f.x > W) f.x = 0;
      if (f.x < 0) f.x = W;
    }
    requestAnimationFrame(animate);
  }

  animate();
});



// Experience tab switcher
document.querySelectorAll('.exp-company').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.exp-company').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    document.querySelectorAll('.exp-role').forEach(role => {
      role.classList.remove('active');
      if (role.dataset.company === this.dataset.company) {
        role.classList.add('active');
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  // Define segments
  const before = "Hi, ";
  const highlight = "Yashwanth";
  const after = " here.";
  const total = before + highlight + after;
  const highlightStart = before.length;
  const highlightEnd = before.length + highlight.length;

  const typedText = document.getElementById("typed-text");
  let idx = 0;

  function typeLetter() {
    if (idx <= total.length) {
      let result = "";
      if (idx <= highlightStart) {
        // Typing before the highlight
        result = total.substring(0, idx);
      } else if (idx <= highlightEnd) {
        // Typing the highlighted name
        result =
          before +
          `<span class="hero-highlight">${highlight.substring(0, idx - highlightStart)}</span>`;
      } else {
        // After the highlight
        result =
          before +
          `<span class="hero-highlight">${highlight}</span>` +
          after.substring(0, idx - highlightEnd);
      }
      typedText.innerHTML = result;
      idx++;
      setTimeout(typeLetter, 120);
    }
  }

  typeLetter();
});

