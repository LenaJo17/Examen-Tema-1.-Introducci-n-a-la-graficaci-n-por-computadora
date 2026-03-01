/**
 * ============================================================
 * Aplicación: Flor Vitral - Canvas API
 * Autor: Jolette Ochoa
 * Descripción:
 * Flor estilo vitral dibujada con Canvas utilizando
 * figuras geométricas, transformaciones y recortes (clip).
 * ============================================================
 */

window.onload = function () {

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

/* ================= DIMENSIONES DEL LIENZO ================= */
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;

/* ================= ESCALADO PARA LLENAR EXACTAMENTE ================= */
// Centro y escala ajustados para ocupar todo el canvas como la imagen
const SCALE = .55;  // Factor de escala para matching perfecto
const cx = CANVAS_WIDTH / 2;
const cy = CANVAS_HEIGHT * 0.35;  // Posición Y optimizada para el canvas completo

const STROKE = '#1a1a1a';
const SW = 2 * SCALE;

/* ================= TALLO (escalado) ================= */
const sw = 35 * SCALE;
const segH = 35 * SCALE;
const totalSegs = 15;
const stemTop = cy + 20 * SCALE;
const stemBot = stemTop + totalSegs * segH;

/* ================= COLORES ================= */
const PINK = '#eaa8cc';
const PURPLE = '#b989e3';
const INNER_COL = '#c0307a';

/* ================= PÉTALOS ESCALADOS ================= */
const PETAL_OFFSET = 95 * SCALE;
const PETAL_RX = 85 * SCALE;
const PETAL_RY = 170 * SCALE;
const CIRC_DIST = 10 * SCALE;
const CIRC_R = 115 * SCALE;

const angles = Array.from({length: 5}, (_, i) =>
    (i / 5) * Math.PI * 2 - Math.PI / 95
);

function circCenter(angle) {
  return {
    x: cx + Math.cos(angle) * CIRC_DIST,
    y: cy + Math.sin(angle) * CIRC_DIST
  };
}

/* ================= TALLO CORREGIDO (Integrar en tu código) ================= */
function drawStem() {
  const nSegs = 11; // Número de segmentos
  const h = 48 * SCALE; // Altura de cada segmento
  const w = 26 * SCALE; // Ancho del tallo
  const yStart = cy + (10 * SCALE);

  // Guardamos para que drawLeaf las pueda usar (mantengo tus variables)
  STEM_X = cx;
  STEM_Y_START = yStart;
  STEM_Y_END = yStart + nSegs * h;
  STEM_W = w;

  ctx.fillStyle = '#82BD65'; // Color verde claro de la imagen
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2 * SCALE;

  // 1. Dibujamos el rectángulo principal del tallo
  ctx.beginPath();
  ctx.rect(cx - w/2, yStart, w, nSegs * h);
  ctx.fill();
  ctx.stroke();

 for (let i = 0; i < nSegs; i++) {
    let yTop    = yStart + (i * h);
    let yBottom = yStart + ((i + 1) * h);

    // Línea horizontal divisoria
    ctx.beginPath();
    ctx.moveTo(cx - w/2, yBottom);
    ctx.lineTo(cx + w/2, yBottom);
    ctx.stroke();

    // Diagonales SOLO en segmentos 0 y 1
    if (i === 5) {
      ctx.beginPath();
      ctx.moveTo(cx - w/2, yTop);
      ctx.lineTo(cx + w/2, yBottom);
      ctx.stroke();
    }
    
    if (i === 4) {
      ctx.beginPath();
      ctx.moveTo(cx + w/2, yTop);
      ctx.lineTo(cx - w/2, yBottom);
      ctx.stroke();
    }
  }
}
/* ================= HOJAS ================= */
function drawLeaf(flip) {
  // Hojas al 75% del tallo, pegadas al borde del tallo
  const leafY = STEM_Y_START + (STEM_Y_END - STEM_Y_START) * 0.90;
  const lw = 110 * SCALE;
  const lh = 42 * SCALE;

  ctx.save();
  // flip=true → hoja derecha, flip=false → hoja izquierda
  ctx.translate(cx + (flip ? STEM_W/2 : -STEM_W/2), leafY);
  ctx.scale(flip ? 1 : -1, 1);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(lw * 0.35, -lh, lw * 0.7, -lh, lw, 0);
  ctx.bezierCurveTo(lw * 0.7,  lh, lw * 0.3,  lh, 0, 0);
  ctx.closePath();

  ctx.fillStyle = '#6fb34f';
  ctx.fill();
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2 * SCALE;
  ctx.stroke();

  // Nervio central
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(lw, 0);
  ctx.stroke();

  ctx.restore();
}

/* ================= PÉTALOS ================= */
function drawPetals() {
  // PASO 1: Mitad rosa / mitad morado
  angles.forEach(angle => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = PINK;
    ctx.fillRect(-PETAL_RX - 2 * SCALE, -PETAL_OFFSET - PETAL_RY - 2 * SCALE,
                 PETAL_RX + 2 * SCALE, PETAL_RY * 2 + 4 * SCALE);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = PURPLE;
    ctx.fillRect(0, -PETAL_OFFSET - PETAL_RY - 2 * SCALE,
                 PETAL_RX + 2 * SCALE, PETAL_RY * 2 + 4 * SCALE);
    ctx.restore();

    ctx.restore();
  });

  // PASO 2: Zona oscura
  angles.forEach(angle => {
    const c = circCenter(angle);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.beginPath();
    ctx.arc(c.x, c.y, CIRC_R, 0, Math.PI * 2);
    ctx.fillStyle = INNER_COL;
    ctx.fill();

    ctx.restore();
  });

  // Bordes exteriores
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

/* ================= CENTRO (escalado) ================= */
function drawStamens() {
  ctx.beginPath();
  ctx.ellipse(cx, cy, 18 * SCALE, 26 * SCALE, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#f5c518';
  ctx.fill();
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = SW;
  ctx.stroke();

  const count = 8;
  const dist = 40 * SCALE;

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const sx = cx + Math.cos(a) * dist;
    const sy = cy + Math.sin(a) * dist;

    ctx.beginPath();
    ctx.arc(sx, sy, 9 * SCALE, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#f5c518' : '#e87c2a';
    ctx.fill();
    ctx.stroke();
  }
}

/* ================= RENDER ================= */
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawStem();
  drawLeaf(false);
  drawLeaf(true);
  drawPetals();
  drawStamens();
}

draw();

};
