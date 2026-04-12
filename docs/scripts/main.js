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

/* Lógica de Traducción i18n */
let translations = {};
const translateBtn = document.getElementById('translate-btn');

async function loadTranslations() {
  try {
    // 1. Capturar el texto original en español directamente del HTML si no existe el respaldo
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!el.hasAttribute('data-es-original')) {
        el.setAttribute('data-es-original', el.innerHTML);
      }
    });

    // 2. Capturar el enlace original (español) si existe el atributo data-i18n-link
    document.querySelectorAll('[data-i18n-link]').forEach(el => {
      if (!el.hasAttribute('data-es-href')) {
        el.setAttribute('data-es-href', el.getAttribute('href'));
      }
    });

    const response = await fetch('translations.json');
    translations = await response.json();
    
    const savedLang = localStorage.getItem('language') || 'es';
    applyLanguage(savedLang);
  } catch (error) {
    console.error('Error cargando traducciones:', error);
  }
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);

  const elementsToTranslate = document.querySelectorAll('[data-i18n]');
  elementsToTranslate.forEach(el => {
    const key = el.getAttribute('data-i18n');
    
    if (lang === 'es' && el.hasAttribute('data-es-original')) {
      el.innerHTML = el.getAttribute('data-es-original');
    } else if (translations[key]) {
      el.innerHTML = translations[key];
    }
  });

  // Aplicar traducción a los atributos href (enlaces)
  const linksToTranslate = document.querySelectorAll('[data-i18n-link]');
  linksToTranslate.forEach(el => {
    const key = el.getAttribute('data-i18n-link');
    if (lang === 'es' && el.hasAttribute('data-es-href')) {
      el.href = el.getAttribute('data-es-href');
    } else if (translations[key]) {
      el.href = translations[key];
    }
  });

  // Recargar modales según el idioma aplicado
  loadModals(lang);
}

function loadModals(lang) {
  const modalFile = lang === 'en' ? 'modales-en.html' : 'modales-es.html';
  
  fetch(modalFile)
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById('modal-container');
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(err => console.error('Error cargando los modales:', err));
}

if (translateBtn) {
  translateBtn.addEventListener('click', () => {
    const newLang = document.documentElement.lang === 'es' ? 'en' : 'es';
    applyLanguage(newLang);
  });
}

document.addEventListener('DOMContentLoaded', loadTranslations);

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