const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const searchForm = document.querySelector('.search-form');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    searchForm.classList.toggle('active');
});
