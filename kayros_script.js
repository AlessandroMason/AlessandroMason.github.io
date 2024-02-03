const mobileNav = document.querySelector(".nav__hamburger");
const navbar = document.querySelector(".header__menubar");

const toggleNav = () => {
  navbar.classList.toggle("header__menubar--active");
  mobileNav.classList.toggle("nav__hamburger--active");
};
mobileNav.addEventListener("click", () => toggleNav());
