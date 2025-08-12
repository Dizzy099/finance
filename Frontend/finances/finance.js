document.addEventListener("DOMContentLoaded", () => {
    const bankCards = document.querySelectorAll(".bank-card");

    bankCards.forEach((card) => {
        card.addEventListener("click", () => {
            alert(`You selected ${card.textContent.trim()}!`);
        });
    });
});

const footerLinks = document.querySelectorAll(".footer-link a");
footerLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const url = link.getAttribute("href");
        if (url) {
            window.open(url, "_blank");
        }
    });
});

function toggleSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
        section.classList.remove("active");
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

toggleSection("finance");