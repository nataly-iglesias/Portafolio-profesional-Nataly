/* Lógica para el indicador de sección activa en el Navbar */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150; 
    const sectionId = current.getAttribute('id');
    
    // Buscamos el enlace que corresponde a esta sección
    const navLink = document.querySelector(`.navbar-nav a[href*=${sectionId}]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

/* Cargar modales externos */
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.documentElement.lang; // Detecta 'es' o 'en'
  const modalFile = lang === 'en' ? 'modales-en.html' : 'modales-es.html';
  
  fetch(modalFile)
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
    })
    .catch(err => console.error('Error cargando los modales:', err));
});

/*
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
*/

/*
//Animación estrellas cursor
  document.addEventListener("mousemove", function(e) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.innerHTML = "☆";

  star.style.left = e.clientX + "px";
  star.style.top = e.clientY + "px";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 700);
});
*/