/**
 * ============================================================
 * Aplicación: Flor Vitral - Canvas API
 * Autor: Jolette Ochoa
 * Ajustes Finales: Tallo alargado al final y contornos definidos
 * ============================================================
 */

window.onload = function () {

  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  const CANVAS_WIDTH  = 500;
  const CANVAS_HEIGHT = 600;
  const SCALE         = 0.62;
  const cx            = CANVAS_WIDTH / 2;
  const cy            = CANVAS_HEIGHT * 0.35;

  const STROKE = '#1a1a1a';
  const SW     = 3 * SCALE;

  const COLORS = {
    PINK:      '#eaa8cc',
    PURPLE:    '#b989e3',
    INNER_COL: '#c0307a',
    DARK_PINK: '#c24c95',
    YELLOW:    '#f5c518',
    ORANGE:    '#e87c2a',
    STEM:      '#82BD65',
    LEAF:      '#6fb34f'
  };

  const PETAL_OFFSET = 95  * SCALE;
  const PETAL_RX     = 80  * SCALE;
  const PETAL_RY     = 170 * SCALE;
  const PETAL_COUNT  = 5;

  const angles = Array.from({length: PETAL_COUNT}, (_, i) =>
    (i / PETAL_COUNT) * Math.PI * 2 - Math.PI / 95
  );

  let STEM_W;
  let leafCalculatedY = 0;

  /* ================= TALLO ================= */
  function drawStem() {
    const nSegs   = 9;
    const w       = 40 * SCALE;
    let yCurrent  = cy + (-10 * SCALE);
    const normalH = 48 * SCALE;

    STEM_W = w;

    ctx.fillStyle   = COLORS.STEM;
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = 2 * SCALE;

    for (let i = 0; i < nSegs; i++) {
      let h       = (i >= 6) ? normalH * 1.6 : normalH;
      let yTop    = yCurrent;
      let yBottom = yCurrent + h;

      ctx.beginPath();
      ctx.rect(cx - w/2, yTop, w, h);
      ctx.fill();
      ctx.stroke();

      if (i === 4) {
        ctx.beginPath();
        ctx.moveTo(cx + w/2, yTop);
        ctx.lineTo(cx - w/2, yBottom);
        ctx.stroke();
      }
      if (i === 5) {
        ctx.beginPath();
        ctx.moveTo(cx - w/2, yTop);
        ctx.lineTo(cx + w/2, yBottom);
        ctx.stroke();
      }

      if (i === 7) leafCalculatedY = yBottom;

      yCurrent = yBottom;
    }
  }

  /* ================= HOJAS ================= */
  function drawLeaf(x, y, flip) {
    const lw = 200 * SCALE;
    const lh = 60  * SCALE;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(flip ? Math.PI / 5 : -Math.PI / 5);
    if (flip) ctx.scale(-1, 1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(lw / 2, -lh, lw, 0);
    ctx.quadraticCurveTo(lw / 2,  lh, 0, 0);
    ctx.closePath();

    ctx.fillStyle   = COLORS.LEAF;
    ctx.fill();
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = 2 * SCALE;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lw, 0);
    ctx.stroke();

    ctx.restore();
  }

  /* ================= PÉTALOS EXTERIORES (solo fills) ================= */
  function drawPetals() {
    angles.forEach(angle => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // fill rosa mitad izquierda
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = COLORS.PINK;
      ctx.fillRect(-PETAL_RX - 2*SCALE, -PETAL_OFFSET - PETAL_RY - 2*SCALE,
                    PETAL_RX + 2*SCALE,  PETAL_RY * 2 + 4*SCALE);
      ctx.restore();

      // fill morado mitad derecha
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = COLORS.PURPLE;
      ctx.fillRect(0, -PETAL_OFFSET - PETAL_RY - 2*SCALE,
                   PETAL_RX + 2*SCALE, PETAL_RY * 2 + 4*SCALE);
      ctx.restore();

      ctx.restore();
    });
  }

  /* ================= BORDES Y LÍNEAS DIVISORIAS (al final) ================= */
  function drawPetalLines() {
  angles.forEach(angle => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Borde exterior clippeado al pétalo — no se sale
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = SW;
    ctx.stroke();
    ctx.restore();

    // Línea divisoria clippeada
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(0, -PETAL_OFFSET - PETAL_RY);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = SW;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  });
}

  /* ================= PÉTALOS INTERIORES ================= */
  function drawInnerPetals() {
    for (let i = 0; i < PETAL_COUNT; i++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((i * 72 * Math.PI) / 180);

      ctx.beginPath();
      ctx.ellipse(0, -75 * SCALE, 75 * SCALE, 85 * SCALE, 0, 0, Math.PI * 2);
      ctx.fillStyle   = COLORS.DARK_PINK;
      ctx.fill();
      ctx.strokeStyle = STROKE;
      ctx.lineWidth   = SW;
      ctx.stroke();

      ctx.restore();
    }
  }

  /* ================= CENTRO Y PISTILOS ================= */
  function drawStamens() {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 18 * SCALE, 26 * SCALE, 0, 0, Math.PI * 2);
    ctx.fillStyle   = COLORS.YELLOW;
    ctx.fill();
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = SW;
    ctx.stroke();

    const count = 8;
    const dist  = 40 * SCALE;

    for (let i = 0; i < count; i++) {
      const a  = (i / count) * Math.PI * 2;
      const sx = cx + Math.cos(a) * dist;
      const sy = cy + Math.sin(a) * dist;

      ctx.beginPath();
      ctx.arc(sx, sy, 9 * SCALE, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? COLORS.YELLOW : COLORS.ORANGE;
      ctx.fill();
      ctx.strokeStyle = STROKE;
      ctx.lineWidth   = 1.5 * SCALE;
      ctx.stroke();
    }
  }

  /* ================= RENDER ================= */
  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawStem();
    drawLeaf(cx - STEM_W/2, leafCalculatedY, false);
    drawLeaf(cx + STEM_W/2, leafCalculatedY, true);

    drawPetals();       // fills de color
    drawInnerPetals();  // pétalos interiores
    drawStamens();      // centro y pistilos
    drawPetalLines();   // bordes y líneas AL FINAL
  }

  draw();

};