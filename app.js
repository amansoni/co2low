// CO2 Low Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ================================= MOBILE NAVIGATION ================================= //
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('nav--open');
      
      // Update button text for accessibility
      const isOpen = navMenu.classList.contains('nav--open');
      navToggle.textContent = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('nav--open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('nav--open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ================================= SMOOTH SCROLL FOR ALL ANCHOR LINKS ================================= //
  // Get all anchor links that start with #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('nav--open')) {
          navMenu.classList.remove('nav--open');
          if (navToggle) {
            navToggle.textContent = '☰';
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // ================================= ACTIVE NAVIGATION HIGHLIGHTING ================================= //
  const navbarLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for fixed navbar

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navbarLinks.forEach(link => {
      link.classList.remove('nav-link--active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav-link--active');
      }
    });
  }

  // Add CSS for active nav link
  const style = document.createElement('style');
  style.textContent = `
    .nav-link--active {
      color: var(--color-primary) !important;
      font-weight: var(--font-weight-semibold) !important;
    }
  `;
  document.head.appendChild(style);

  // Update active link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  // Update on load
  updateActiveNavLink();

  // ================================= SCROLL TO TOP FUNCTIONALITY ================================= //
  // Create scroll to top button
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.innerHTML = '↑';
  scrollToTopButton.className = 'scroll-to-top btn btn--primary';
  scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
  scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    pointer-events: none;
    border: none;
    cursor: pointer;
  `;
  
  document.body.appendChild(scrollToTopButton);

  // Show/hide scroll to top button
  function toggleScrollToTopButton() {
    if (window.scrollY > 300) {
      scrollToTopButton.style.opacity = '1';
      scrollToTopButton.style.transform = 'translateY(0)';
      scrollToTopButton.style.pointerEvents = 'auto';
    } else {
      scrollToTopButton.style.opacity = '0';
      scrollToTopButton.style.transform = 'translateY(20px)';
      scrollToTopButton.style.pointerEvents = 'none';
    }
  }

  window.addEventListener('scroll', toggleScrollToTopButton);

  // Scroll to top functionality
  scrollToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ================================= CONTACT FORM ENHANCEMENTS ================================= //
  // Add loading state to email button
  const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
  emailButtons.forEach(emailButton => {
    emailButton.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = 'Opening email client...';
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.opacity = '1';
      }, 2000);
    });
  });

  // ================================= ACCESSIBILITY ENHANCEMENTS ================================= //
  // Add keyboard navigation support for mobile menu
  if (navToggle) {
    navToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  // Ensure proper focus management for mobile menu
  navbarLinks.forEach(link => {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (navMenu) {
          navMenu.classList.remove('nav--open');
        }
        if (navToggle) {
          navToggle.textContent = '☰';
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.focus();
        }
      }
    });
  });

  // ================================= ANIMATION ON SCROLL ================================= //
  // Simple fade-in animation for cards when they come into view
  const animateElements = document.querySelectorAll('.card');
  
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animateElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  console.log('CO2 Low website initialized successfully! 🌱');
});