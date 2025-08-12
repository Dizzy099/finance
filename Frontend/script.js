const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

menuIcon.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

function toggleMenu() {
  document.querySelector('.navbar-links').classList.toggle('active');
}

document.addEventListener("click", (event) => {
  if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove("show");
  }
});

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.getElementById('menuIcon').addEventListener('click', function () {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', function (e) {
  const menuIcon = document.getElementById('menuIcon');
  const dropdown = document.getElementById('dropdownMenu');

  if (!menuIcon.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

fetch('http://localhost:5000/api/data')  // backend ka URL
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
    // Aap yahan pe apne frontend mein data display kar sakte hain
  })
  .catch(error => console.error('Error:', error));


