// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MENÚ HAMBURGUESA =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ANIMACIÓN DE CONTADORES =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = Math.max(1, Math.floor(target / (duration / 16))); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                return;
            }
            counter.textContent = current + '+';
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    });
}

// Iniciar contadores cuando el elemento es visible
const heroStats = document.querySelector('.hero-stats');
let countersAnimated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (heroStats) observer.observe(heroStats);

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
        showMessage('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Por favor, ingresa un email válido.', 'error');
        return;
    }
    
    // Simulación de envío
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        showMessage('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== SCROLL REVEAL =====
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.service-card, .about-content, .contact-wrapper', {
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        delay: 100,
        easing: 'ease',
        interval: 150
    });
}

// ===== EFECTO DE PARALLAX EN EL HERO =====
document.addEventListener('mousemove', function(e) {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== DETECTAR SECCIÓN ACTIVA EN NAV =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

console.log('🚀 TechSolutions - Sitio web profesional cargado correctamente');