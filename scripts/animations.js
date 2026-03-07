/**
 * Animaciones para Mandala Cakes
 * Este archivo contiene las animaciones de scroll reveal
 */

document.addEventListener("DOMContentLoaded", function() {
    initScrollReveal();
});

/**
 * Inicializa la animación de scroll reveal
 * Los elementos con clase .reveal se animan cuando aparecen en pantalla
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    if (!reveals.length) return;
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
}

// Exponer la función globalmente para poder llamarla desde otros scripts
window.initScrollReveal = initScrollReveal;

