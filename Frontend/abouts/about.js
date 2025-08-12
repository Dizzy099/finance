function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.getAttribute('href').replace('#', '') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

document.querySelectorAll('.footer-link a').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const footerDate = document.querySelector('.social-profile p');
    if (footerDate) {
        const currentYear = new Date().getFullYear();
        footerDate.innerHTML = `© ${currentYear} - 2040, FinZrs Finance Ltd.<br />All rights reserved.`;
    }
});