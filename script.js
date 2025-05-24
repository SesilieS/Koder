const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');

if (hamburger && navContainer) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}