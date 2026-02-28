/**
 * ============================================================
 *  Aplicación: CodeOrca Canvas App
 *  Autor: Jolette Ochoa
 *  Materia: Programación Web
 *  Tema: HTML5 Canvas API
 *  Fecha: 2026
 *  
 *  Descripción:
 *  Aplicación que replica una imagen de un delfín
 *  utilizando la API de Canvas de HTML5.
 *  El código está organizado por figuras.
 * ============================================================
 */

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    drawBackground(ctx);
    drawClouds(ctx);
    drawDolphinBody(ctx);
    drawDolphinDetails(ctx);
    drawSplash(ctx);
};

/* ===============================
   FONDO
=================================*/
function drawBackground(ctx) {
    let gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "#6ec1e4");
    gradient.addColorStop(1, "#ffffff");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);
}

/* ===============================
   NUBES
=================================*/
function drawClouds(ctx) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.beginPath();
    ctx.arc(200, 120, 60, 0, Math.PI * 2);
    ctx.arc(260, 120, 50, 0, Math.PI * 2);
    ctx.arc(150, 120, 50, 0, Math.PI * 2);
    ctx.fill();
}

/* ===============================
   CUERPO DEL DELFÍN
=================================*/
function drawDolphinBody(ctx) {

    let gradient = ctx.createLinearGradient(100, 200, 400, 300);
    gradient.addColorStop(0, "#0099cc");
    gradient.addColorStop(1, "#66ffff");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(260, 270, 150, 70, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Cola
    ctx.beginPath();
    ctx.moveTo(120, 260);
    ctx.lineTo(70, 220);
    ctx.lineTo(70, 300);
    ctx.closePath();
    ctx.fill();
}

/* ===============================
   DETALLES DEL DELFÍN
=================================*/
function drawDolphinDetails(ctx) {

    // Ojo
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(350, 250, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(355, 250, 7, 0, Math.PI * 2);
    ctx.fill();

    // Aleta
    ctx.fillStyle = "#0077aa";
    ctx.beginPath();
    ctx.moveTo(260, 270);
    ctx.lineTo(240, 330);
    ctx.lineTo(290, 300);
    ctx.closePath();
    ctx.fill();
}

/* ===============================
   SALPICADURA
=================================*/
function drawSplash(ctx) {
    ctx.fillStyle = "#00bfff";

    ctx.beginPath();
    ctx.arc(260, 380, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(230, 350, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(290, 350, 15, 0, Math.PI * 2);
    ctx.fill();
}