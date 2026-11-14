// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced hover effects for lab entries
    const labEntries = document.querySelectorAll('.lab-entry');

    labEntries.forEach(entry => {
        entry.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 40px rgba(45, 52, 54, 0.15)';
        });

        entry.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(45, 52, 54, 0.12)';
        });
    });

    // Image hover effects
    const outputImages = document.querySelectorAll('.output-image');

    outputImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.4s ease';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.02)';
        });
    });

    // Custom cursor for interactive elements
    const interactiveElements = document.querySelectorAll('.lab-entry, .output-image, a, button');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });

        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.lab-entry, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Parallax effect for hero visual
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');

        if (heroVisual) {
            const speed = scrolled * 0.3;
            heroVisual.style.transform = `translateY(${speed}px)`;
        }

        // Update nav background opacity based on scroll
        const nav = document.querySelector('.main-nav');
        const opacity = Math.min(scrolled / 100, 0.95);
        nav.style.background = `rgba(250, 248, 244, ${opacity})`;
    });

    // Add typewriter effect to tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';

        let index = 0;
        const typewriterInterval = setInterval(() => {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typewriterInterval);
            }
        }, 100);
    }

    // Add subtle animation to wireframe cube
    const cubeWireframe = document.querySelector('.cube-wireframe');
    if (cubeWireframe) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            cubeWireframe.style.transform = `rotateY(${rotation}deg) rotateX(10deg)`;
        }, 50);
    }

    // Lab entry stagger animation
    setTimeout(() => {
        const entries = document.querySelectorAll('.lab-entry');
        entries.forEach((entry, index) => {
            setTimeout(() => {
                entry.style.opacity = '1';
                entry.style.animation = 'fadeInUp 0.8s ease forwards';
            }, index * 200);
        });
    }, 500);

    // Add click interaction for project cards
    const projectCards = document.querySelectorAll('.output-image');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle "click" animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
            }, 150);
        });
    });

    // Add gentle floating animation to hero elements
    function addFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.rotating-object, .brand-header');

        floatingElements.forEach((element, index) => {
            let start = Date.now();
            let offset = index * 1000; // Stagger the animations

            function animate() {
                const elapsed = Date.now() - start;
                const y = Math.sin((elapsed + offset) / 3000) * 5; // Gentle floating
                element.style.transform = `translateY(${y}px)`;
                requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
        });
    }

    // Start floating animation after page load
    setTimeout(addFloatingAnimation, 1000);
});