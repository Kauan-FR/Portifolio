/* =====================================================
   KAUAN FERREIRA - PORTFOLIO
   JavaScript - Interações e Animações
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== CURSOR PERSONALIZADO =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animação suave do cursor
        function animateCursor() {
            // Cursor principal - segue instantaneamente
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower - segue com delay
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Efeito hover em links e botões
        const hoverElements = document.querySelectorAll('a, button, .skill-item, .project-card, .contact-card, .info-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ===== NAVEGAÇÃO MOBILE =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Fechar menu ao clicar em link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adicionar classe quando scrollar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // ===== SCROLL SUAVE PARA ÂNCORAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ANIMAÇÃO DE ENTRADA (Intersection Observer) =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.section-header, .about__text, .about__info, .skill-category, .project-card, .contact-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ===== TYPING EFFECT NO HERO =====
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Iniciar após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // ===== EFEITO PARALLAX SUTIL NO HERO GRID =====
    const heroGrid = document.querySelector('.hero__grid');
    
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            heroGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // ===== SKILL ITEMS - EFEITO DE TOOLTIP =====
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-skill');
        
        item.addEventListener('mouseenter', () => {
            // Adicionar classe de destaque
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '1';
        });
    });

    // ===== PRELOADER (Opcional - para quando tiver imagens) =====
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ===== CONSOLE MESSAGE =====
    console.log(`
    %c 👋 Olá, desenvolvedor curioso!
    
    Este portfólio foi desenvolvido por Kauan Ferreira.
    
    Tecnologias utilizadas:
    • HTML5 Semântico
    • CSS3 (Custom Properties, Flexbox, Grid)
    • JavaScript Vanilla (ES6+)
    
    🚀 Disponível para oportunidades!
    
    `, 'background: #0a0a0b; color: #22c55e; padding: 20px; font-size: 14px;');
});

// ===== PERFORMANCE: Debounce para eventos de scroll =====
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== LAZY LOADING PARA IMAGENS (quando adicionar) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}