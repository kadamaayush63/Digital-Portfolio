// ============================================================

// AYUSH KADAM — PORTFOLIO SCRIPTS
// ============================================================

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  follower.style.left = e.clientX + 'px';
  follower.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(245,166,35,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(245,166,35,0.5)';
  });
});

// ── Intersection Observer for Reveal ──
const revealEls = document.querySelectorAll(
  '.about-grid, .skill-card, .project-card, .contact-inner, .section-title, .section-label'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Skill Bar Animation ──
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        setTimeout(() => {
          bar.style.width = bar.style.getPropertyValue('--w') ||
            getComputedStyle(bar).getPropertyValue('--w');
          // Trigger via CSS var
          bar.style.width = bar.style.cssText.match(/--w:\s*([\d%]+)/)?.[1] || '0%';
        }, 300);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => {
  skillObserver.observe(card);
  const bar = card.querySelector('.skill-bar');
  if (bar) {
    // Store original width, set to 0 initially
    const targetWidth = bar.style.cssText.match(/--w:\s*([^;]+)/)?.[1] || '0%';
    bar.setAttribute('data-target', targetWidth);
    bar.style.width = '0%';
  }
});

// Re-trigger skill bars
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        const target = bar.getAttribute('data-target');
        setTimeout(() => { bar.style.width = target; }, 400);
      }
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => barObserver.observe(card));

// ── Smooth Nav ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Parallax hero background text ──
const heroBg = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translate(-50%, calc(-52% + ${y * 0.25}px))`;
});

// ── Active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});

console.log('%cHey! 👋 Ayush Kadam — Portfolio', 'color: #f5a623; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & Vanilla JS', 'color: #7a766d; font-family: monospace;');
