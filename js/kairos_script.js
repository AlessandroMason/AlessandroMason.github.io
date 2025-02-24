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


const reviewsTrack = document.getElementById('reviewsTrack');

let autoScrollInterval;
let currentIndex = 0;
let isPaused = false;
document.addEventListener('DOMContentLoaded', () => {
  const reviewsTrack = document.getElementById('reviewsTrack');


  let autoScrollInterval;
  let currentIndex = 0;
  let isPaused = false;
  let slideWidth = 0;

  function initializeReviews() {
      const reviewScrollers = document.querySelectorAll(".reviews-scroller");
      
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          reviewScrollers.forEach((scroller) => {
              scroller.setAttribute("data-animated", true);
              
              const scrollerInner = scroller.querySelector(".reviews-scroller__inner");
              if (!scrollerInner) return;

              const scrollerContent = Array.from(scrollerInner.children);
              
              // Clone items for infinite scroll
              scrollerContent.forEach((item) => {
                  const duplicatedItem = item.cloneNode(true);
                  duplicatedItem.setAttribute("aria-hidden", true);
                  scrollerInner.appendChild(duplicatedItem);
              });
          });
          
          // Calculate initial slide width
          const firstCard = document.querySelector('.review-card');
          if (firstCard) {
              slideWidth = firstCard.offsetWidth + 32; // width + gap
          }
          
          startAutoScroll();
      }
  }

  function startAutoScroll() {
      if (!isPaused && slideWidth > 0) {
          reviewsTrack.classList.add('auto-scrolling');
          const totalSlides = reviewsTrack.children.length;
          
          autoScrollInterval = setInterval(() => {
              currentIndex = (currentIndex + 1) % totalSlides;
              updateSlidePosition();
          }, 5000); // Change slide every 5 seconds
      }
  }

  function stopAutoScroll() {
      clearInterval(autoScrollInterval);
      reviewsTrack.classList.remove('auto-scrolling');
  }

  function updateSlidePosition() {
      if (slideWidth > 0) {
          const newPosition = -currentIndex * slideWidth;
          reviewsTrack.style.transform = `translateX(${newPosition}px)`;
      }
  }

  function handleManualNavigation(direction) {
      stopAutoScroll();
      isPaused = true;
      
      const totalSlides = reviewsTrack.children.length;
      if (direction === 'prev') {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      } else {
          currentIndex = (currentIndex + 1) % totalSlides;
      }
      
      updateSlidePosition();
      
      // Resume auto-scroll after 10 seconds of inactivity
      setTimeout(() => {
          isPaused = false;
          startAutoScroll();
      }, 10000);
  }



  // Handle mouse interaction
  reviewsTrack.addEventListener('mouseenter', () => {
      stopAutoScroll();
      isPaused = true;
  });

  reviewsTrack.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoScroll();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
      const firstCard = document.querySelector('.review-card');
      if (firstCard) {
          slideWidth = firstCard.offsetWidth + 32;
          updateSlidePosition();
      }
  });

  // Initialize the reviews
  initializeReviews();
});