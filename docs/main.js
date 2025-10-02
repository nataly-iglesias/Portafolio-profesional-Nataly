let app = document.getElementById('typewriter');
 
let typewriter = new Typewriter(app, {
  delay: 75,
 cursor: "<span style='color: #666a87;'>|</span>",
});
 
// Animación: Maquina de escribir
typewriter
  .pauseFor(1700)
  .typeString('<span style="color: #666a87;">Front-end Developer and UI/UX Designer</span>')
  .pauseFor(200)
  .start();