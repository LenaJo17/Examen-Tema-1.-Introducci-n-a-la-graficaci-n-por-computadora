/**
 * ============================================================
 *  Aplicación: Flor Vitral - Canvas API
 *  Autor: Jolette Ochoa
 *  Fecha: 2026
 *  Descripción:
 *  Dibuja una flor estilo vitral utilizando figuras geométricas,
 *  transformaciones, recortes (clip) y composición en Canvas.
 * ============================================================
 */

window.onload = function () {

const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');

/* ================= VARIABLES ================= */

const cx = 250;
const cy = 220;
const STROKE = '#1a1a1a';
const SW = 1.8;

const sw = 24;
const stemTop = cy + 42;
const segH = sw;
const totalSegs = 8;
const stemBot = stemTop + totalSegs * segH;

const PINK = '#e8b4d0';
const PURPLE = '#b89ece';
const INNER_COL = '#c0307a';

const PETAL_OFFSET = 52;
const PETAL_RX = 50;
const PETAL_RY = 88;
const CIRC_DIST = 28;
const CIRC_R = 48;

const angles = Array.from({length: 5}, (_, i) =>
    (i / 5) * Math.PI * 2 - Math.PI / 2
);

function circCenter(angle) {
  return {
      x: cx + Math.cos(angle) * CIRC_DIST,
      y: cy + Math.sin(angle) * CIRC_DIST
  };
}

/* ================= TALLO ================= */

function drawStem() {
  ctx.fillStyle = '#4a9c3e';
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = SW;

  ctx.beginPath();
  ctx.rect(cx - sw/2, stemTop, sw, totalSegs * segH);
  ctx.fill();
  ctx.stroke();

  for (let i = 1; i < totalSegs; i++) {
    const y = stemTop + i * segH;
    ctx.beginPath();
    ctx.moveTo(cx - sw/2, y);
    ctx.lineTo(cx + sw/2, y);
    ctx.stroke();
  }
}

/* ================= HOJAS ================= */

function drawLeaf(flip) {
  const leafY = stemTop + (stemBot - stemTop) * 0.8;
  const lw = 90, lh = 32;

  ctx.save();
  ctx.translate(cx + (flip ? sw/2 : -sw/2), leafY);
  ctx.scale(flip ? 1 : -1, 1);
  ctx.rotate(18 * Math.PI / 180);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(lw * 0.25, -lh, lw * 0.75, -lh, lw, 0);
  ctx.bezierCurveTo(lw * 0.75, lh, lw * 0.25, lh, 0, 0);
  ctx.closePath();

  ctx.fillStyle = '#4a9c3e';
  ctx.fill();
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = SW;
  ctx.stroke();
  ctx.restore();
}

/* ================= PÉTALOS ================= */

function drawPetals() {
  angles.forEach(angle => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.fillStyle = PINK;
    ctx.fill();
    ctx.strokeStyle = STROKE;
    ctx.lineWidth = SW;
    ctx.stroke();

    ctx.restore();
  });
}

/* ================= CENTRO ================= */

function drawStamens() {
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#f5c518';
  ctx.fill();
  ctx.strokeStyle = STROKE;
  ctx.stroke();
}

/* ================= RENDER ================= */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStem();
  drawLeaf(false);
  drawLeaf(true);
  drawPetals();
  drawStamens();
}

draw();

};