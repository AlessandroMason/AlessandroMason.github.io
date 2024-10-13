// const mobileNav = document.querySelector(".nav__hamburger");
// const navbar = document.querySelector(".header__menubar");

// const toggleNav = () => {
//   navbar.classList.toggle("header__menubar--active");
//   mobileNav.classList.toggle("nav__hamburger--active");
// };
// mobileNav.addEventListener("click", () => toggleNav());


const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

document.getElementById("download-btn").addEventListener("click", function() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Controllo per iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href = "https://apps.apple.com/us/app/kairos-attendance/id6605920744"; // Inserisci il link all'App Store
  }
  // Controllo per Android
  else if (/android/i.test(userAgent)) {
    window.location.href = "https://play.google.com/store/apps/details?id=com.kairos.attendances"; // Inserisci il link a Google Play
  }
  // Altro sistema operativo
  else {
    window.location.href = "https://apps.apple.com/us/app/kairos-attendance/id6605920744"; // Inserisci il link alla pagina alternativa
  }
});
