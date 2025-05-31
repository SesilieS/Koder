const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navContainer.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navContainer.contains(e.target)) {
    closeMenu();
  }
});

closeBtn.addEventListener('click', closeMenu);

function closeMenu() {
  navContainer.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('active');
}
const cartCounter = document.getElementById('cart-count');
let count = 0;

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('add-to-basket')) {
    count++;
    cartCounter.textContent = count;
  }
});
