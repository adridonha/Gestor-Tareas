'use strict';
// Cambiar tema
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
  // Guardar el tema en localstorage
  let theme = document.body.className;
  localStorage.setItem('theme', theme);
});

// Cargar tema desde localstorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    // Si existe se aplica
    document.body.className = savedTheme;
  }
  // Por defecto ya esta el light-theme
}

// Menu movil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Cerra menu cuando se pulsa fuera
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Scroll suave al pulsar inicio
document.querySelector('a[href="#home"]').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Función para mostrar la notificación
function showNotification(title, message) {
  const notificationOverlay = document.getElementById('notification-overlay');
  const notification = document.getElementById('notification');
  const notificationTitle = notification.querySelector('.notification-title');
  const notificationMessage = notification.querySelector('.notification-message');
  
  // Actualizar el contenido
  notificationTitle.textContent = title || '¡Mensaje enviado!';
  notificationMessage.textContent = message || 'Gracias por contactarnos';
  
  // Mostrar la notificación con overlay
  notificationOverlay.classList.add('show');
  
  // Ocultar después de 2 segundos
  setTimeout(() => {
    notificationOverlay.classList.remove('show');
  }, 2000);
}

// Initialize EmailJS - Asegúrarse de que se cargue completamente antes de usarlo
(function() {
  // Verificar que EmailJS está disponible
  if (typeof emailjs !== 'undefined') {
    emailjs.init("fGkbRRMJY7eZGrAOr");
  } else {
    console.error("EmailJS no está cargado correctamente");
  }
})();

// Manejar el envio del formulario
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Verifica que EmailJS esté disponible
  if (typeof emailjs === 'undefined') {
    showNotification('Error', 'La biblioteca EmailJS no está cargada correctamente');
    return;
  }

  // Mostrar estado del envio
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  // Obtener los valores del formulario
  const userName = document.getElementById('name').value;
  const userEmail = document.getElementById('email').value;
  const userMessage = document.getElementById('message').value;

  // Perparar los parametros
  const templateParams = {
    user_name: userName,
    user_email: userEmail,
    message: userMessage,
    to_name: "TaskMaster Pro"
  };

  console.log("Enviando email con parámetros:", templateParams);

  // Enviar email usando EmailJS
  emailjs.send('service_vsp9xor', 'template_tn2tq1l', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showNotification('¡Mensaje enviado!', 'Nos pondremos en contacto contigo pronto');
      document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
      console.error('FAILED...', error);
      showNotification('Error al enviar', 'Por favor, inténtalo de nuevo: ' + error.text);
    })
    .finally(function() {
      // Boton de reset
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

VanillaTilt.init(document.querySelectorAll('.feature-card, .service-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
});

// Cargar el tema
loadTheme();