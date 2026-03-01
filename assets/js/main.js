/**
 * ==========================================================
 * Aplicación: Flor Vitral con Canvas API
 * Autor: Jolette Ochoa
 * Fecha: 2026
 * Descripción:
 * Aplicación web que recrea una imagen estilo vitral
 * utilizando la API Canvas de HTML5.
 *
 * Se emplean:
 * - Rectángulos (rect)
 * - Elipses (ellipse)
 * - Arcos (arc)
 * - Curvas Bézier (bezierCurveTo)
 * - Recortes (clip)
 * - Transformaciones (translate, rotate, scale)
 * - Composición global (globalCompositeOperation)
 *
 * La imagen original se muestra a la derecha,
 * y la imagen generada por programación a la izquierda.
 * ==========================================================
 */

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

/* ============================
   CONFIGURACIÓN GENERAL
============================ */

const cx = 210;
const cy = 180;
const STROKE = '#1a1a1a';
const SW = 1.8;

const sw = 24;
const segH = sw;
const totalSegs = 10;

const PINK = '#e8b4d0';
const PURPLE = '#b89ece';
const INNER_COL = '#c0307a';

const PETAL_OFFSET = 52;
const PETAL_RX = 50;
const PETAL_RY = 88;
const CIRC_DIST = 28;
const CIRC_R = 48;

const angles = Array.from({ length: 5 }, (_, i) =>
  (i / 5) * Math.PI * 2 - Math.PI / 2
);

/* ============================
   FIGURA 1: TALLO SEGMENTADO
============================ */

function drawStem() {

  const stemTop = cy + 20;
  const stemBot = stemTop + totalSegs * segH;

  ctx.fillStyle = '#4a9c3e';
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = SW;

  ctx.beginPath();
  ctx.rect(cx - sw / 2, stemTop, sw, totalSegs * segH);
  ctx.fill();
  ctx.stroke();

  // Líneas horizontales
  for (let i = 1; i < totalSegs; i++) {
    const y = stemTop + i * segH;
    ctx.beginPath();
    ctx.moveTo(cx - sw / 2, y);
    ctx.lineTo(cx + sw / 2, y);
    ctx.stroke();
  }

  // Líneas diagonales vitral
  const L1 = stemTop + segH;
  const L2 = stemTop + segH * 2;
  const L3 = stemTop + segH * 3;

  ctx.beginPath();
  ctx.moveTo(cx + sw / 2, L1);
  ctx.lineTo(cx - sw / 2, L2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - sw / 2, L2);
  ctx.lineTo(cx + sw / 2, L3);
  ctx.stroke();
}

/* ============================
   FIGURA 2: HOJAS (BÉZIER)
============================ */

function drawLeaf(flip) {

  const leafY = cy + 20 + (totalSegs * segH) * 0.80;
  const lw = 90;
  const lh = 32;

  ctx.save();
  ctx.translate(cx + (flip ? sw / 2 : -sw / 2), leafY);
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

  ctx.beginPath();
  ctx.moveTo(2, 0);
  ctx.lineTo(lw - 2, 0);
  ctx.stroke();

  ctx.restore();
}

/* ============================
   FIGURA 3: PÉTALOS MITAD COLOR
============================ */

function drawPetalsBase() {

  angles.forEach(angle => {

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Mitad rosa
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = PINK;
    ctx.fillRect(-PETAL_RX - 2, -PETAL_OFFSET - PETAL_RY, PETAL_RX, PETAL_RY * 2);
    ctx.restore();

    // Mitad morado
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = PURPLE;
    ctx.fillRect(0, -PETAL_OFFSET - PETAL_RY, PETAL_RX, PETAL_RY * 2);
    ctx.restore();

    ctx.restore();
  });
}

/* ============================
   FIGURA 4: CÍRCULOS CENTRALES
============================ */

function drawInnerCircles() {

  angles.forEach(angle => {

    const x = cx + Math.cos(angle) * CIRC_DIST;
    const y = cy + Math.sin(angle) * CIRC_DIST;

    ctx.beginPath();
    ctx.arc(x, y, CIRC_R, 0, Math.PI * 2);
    ctx.fillStyle = INNER_COL;
    ctx.fill();

    ctx.strokeStyle = STROKE;
    ctx.lineWidth = SW;
    ctx.stroke();
  });
}

/* ============================
   FIGURA 5: BORDES PÉTALOS
============================ */

function drawPetalBorders() {

  angles.forEach(angle => {

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = STROKE;
    ctx.lineWidth = SW;
    ctx.stroke();

    ctx.restore();
  });
}

/* ============================
   RENDER PRINCIPAL
============================ */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStem();
  drawLeaf(false);
  drawLeaf(true);
  drawPetalsBase();
  drawInnerCircles();
  drawPetalBorders();
}

draw();