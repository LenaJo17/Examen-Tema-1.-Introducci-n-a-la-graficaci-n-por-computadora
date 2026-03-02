/**
 * ============================================================
 * Proyecto: Flor Vitral - VERSIÓN FINAL CORREGIDA
 * Ajuste: Hojas naciendo exactamente desde la orilla del tallo
 * ============================================================
 */

window.onload = function () {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 600;
  const SCALE = 0.58;
  const cx = CANVAS_WIDTH / 2;
  const cy = CANVAS_HEIGHT * 0.34;

  const STROKE = '#1a1a1a';
  const SW = 3 * SCALE;

  const COLORS = {
    PINK: '#eaa8cc',
    PURPLE: '#b989e3',
    INNER_COL: '#c0307a',
    DARK_PINK: '#c24c95',
    YELLOW: '#f5c518',
    ORANGE: '#e87c2a',
    STEM: '#82BD65',
    LEAF: '#6fb34f'
  };

  const PETAL_OFFSET = 95 * SCALE;
  const PETAL_RX = 70 * SCALE;
  const PETAL_RY = 170 * SCALE;
  const PETAL_COUNT = 5;

  const angles = Array.from({ length: PETAL_COUNT }, (_, i) =>
    (i / PETAL_COUNT) * Math.PI * 2 - Math.PI / 95
  );

  let STEM_W;
  let leafCalculatedY = 0;

  /* --- TALLO --- */
  function drawStem() {
    const nSegs = 9;
    const w = 40 * SCALE;
    let yCurrent = cy + (-10 * SCALE);
    const normalH = 48 * SCALE;
    STEM_W = w;
    
    ctx.fillStyle = COLORS.STEM;
    ctx.strokeStyle = STROKE;
    ctx.lineWidth = 2 * SCALE;

    for (let i = 0; i < nSegs; i++) {
      let h = (i >= 6) ? normalH * 1.40 : normalH;
      let yTop = yCurrent;
      let yBottom = yCurrent + h;
      
      ctx.beginPath();
      ctx.rect(cx - w / 2, yTop, w, h);
      ctx.fill();
      ctx.stroke();

      if (i === 4) {
        ctx.beginPath(); ctx.moveTo(cx + w/2, yTop); ctx.lineTo(cx - w/2, yBottom); ctx.stroke();
      }
      if (i === 5) {
        ctx.beginPath(); ctx.moveTo(cx - w/2, yTop); ctx.lineTo(cx + w/2, yBottom); ctx.stroke();
      }
      if (i === 7) leafCalculatedY = yBottom;
      yCurrent = yBottom;
    }
  }

  /* --- HOJAS (CORREGIDO EL NACIMIENTO) --- */
  function drawLeaf(x, y, flip) {
    const lw = 160 * SCALE; // Largo de la hoja
    const lh = 50 * SCALE;  // Ancho de la hoja
    
    ctx.save();
    ctx.translate(x, y); // Nos movemos al borde del tallo
    
    // Rotación para que la hoja apunte hacia afuera y arriba
    ctx.rotate(flip ? Math.PI / 6 : -Math.PI / 6);
    if (flip) ctx.scale(-1, 1);
    
    ctx.beginPath();
    ctx.moveTo(0, 0); // Empieza exactamente en el punto de contacto
    ctx.quadraticCurveTo(lw / 2, -lh, lw, 0);
    ctx.quadraticCurveTo(lw / 2, lh, 0, 0);
    ctx.closePath();
    
    ctx.fillStyle = COLORS.LEAF;
    ctx.fill();
    ctx.strokeStyle = STROKE;
    ctx.lineWidth = 2 * SCALE;
    ctx.stroke();
    
    // Nervadura central
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lw, 0);
    ctx.stroke();
    
    ctx.restore();
  }

  /* --- PÉTALOS EXTERIORES --- */
  function drawPetals() {
    angles.forEach(angle => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      // Lado Rosa
      ctx.save();
      ctx.beginPath(); ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = COLORS.PINK;
      ctx.fillRect(-PETAL_RX - 2, -PETAL_OFFSET - PETAL_RY - 2, PETAL_RX + 2, PETAL_RY * 2 + 4);
      ctx.restore();
      // Lado Morado
      ctx.save();
      ctx.beginPath(); ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = COLORS.PURPLE;
      ctx.fillRect(0, -PETAL_OFFSET - PETAL_RY - 2, PETAL_RX + 2, PETAL_RY * 2 + 4);
      ctx.restore();
      ctx.restore();
    });
  }

  /* --- LÍNEAS DE PÉTALOS --- */
  function drawPetalLines() {
    angles.forEach(angle => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, -PETAL_OFFSET, PETAL_RX, PETAL_RY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = STROKE; ctx.lineWidth = SW; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -PETAL_OFFSET - PETAL_RY);
      ctx.lineTo(0, -PETAL_OFFSET + PETAL_RY);
      ctx.stroke();
      ctx.restore();
    });
  }

  /* --- PÉTALOS INTERNOS --- */
  function drawInnerPetals() {
    for (let i = 0; i < PETAL_COUNT; i++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((i * 72 * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, -75 * SCALE, 75 * SCALE, 85 * SCALE, 0, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.DARK_PINK;
      ctx.fill();
      ctx.strokeStyle = STROKE; ctx.lineWidth = SW; ctx.stroke();
      ctx.restore();
    }
  }

  /* --- CENTRO Y PISTILOS --- */
  function drawStamens() {
    const count = 8;
    const dist = 40 * SCALE;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const sx = cx + Math.cos(a) * dist;
      const sy = cy + Math.sin(a) * dist;
      ctx.beginPath(); ctx.arc(sx, sy, 9 * SCALE, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? COLORS.ORANGE : COLORS.YELLOW;
      ctx.fill();
      ctx.strokeStyle = STROKE; ctx.lineWidth = 1.5 * SCALE; ctx.stroke();
    }
    ctx.beginPath();
    ctx.ellipse(cx, cy, 18 * SCALE, 26 * SCALE, 0, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.YELLOW;
    ctx.fill();
    ctx.strokeStyle = STROKE; ctx.lineWidth = SW; ctx.stroke();
  }

  /* --- RENDER --- */
  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawStem();
    
    // DIBUJO DE HOJAS EN LOS LATERALES
    // Hoja izquierda (cx menos la mitad del ancho del tallo)
    drawLeaf(cx - STEM_W/2, leafCalculatedY, false);
    // Hoja derecha (cx más la mitad del ancho del tallo)
    drawLeaf(cx + STEM_W/2, leafCalculatedY, true);

    drawPetals();
    drawPetalLines();
    drawInnerPetals();
    drawStamens(); 
  }

  draw();
};