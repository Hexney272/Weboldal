// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .section-header').forEach(el => {
    if (!el.classList.contains('hero-card')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
        const text = stat.textContent;
        const num = parseInt(text);
        if (!isNaN(num) && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            let current = 0;
            const increment = num / 40;
            const suffix = text.replace(/[0-9]/g, '');
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    current = num;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(current) + suffix;
            }, 40);
        }
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== QUOTE FORM =====
const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = quoteForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.textContent = 'Küldés...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = '✓ Árajánlat kérés elküldve!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            quoteForm.reset();
        }, 3000);
    }, 1000);
});
