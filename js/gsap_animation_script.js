gsap.registerPlugin(ScrollTrigger);

const details = gsap.utils.toArray(".features__content__text:not(:first-child)")
const photos = gsap.utils.toArray(".features__content__img__item:not(:first-child)")

gsap.set(photos, {yPercent:101})

const allPhotos = gsap.utils.toArray(".features__content__img__item")

let mm = gsap.matchMedia();

mm.add("(min-width: 900px)", () => {
      
    ScrollTrigger.create({
      trigger:".features__content__desktop",
      start:"top top",
      end:"bottom bottom",
      pin:".features__content__img"
    })

    details.forEach((detail, index)=> {

        let headline = detail.querySelector("h3")
        let animation = gsap.timeline()
        .to(photos[index], {yPercent:-50})
        .set(allPhotos[index], {autoAlpha:0})
        ScrollTrigger.create({
            trigger:headline,
            start:"top 80%",
            end:"top 50%",
            animation:animation,
            scrub:true,
            markers:false
        })
    })
});

let tl_cover = gsap.timeline();

tl_cover.from(".cover__content__text h1", {opacity: 0, y: 150, duration: 1, ease: "power1.inOut"})
.from(".cover__content__text p", {opacity: 0, y: 150, duration: 0.7, ease: "power1.inOut"})
        .from(".cover__img", {opacity: 0, x: 250, duration: 0.7, ease: "power1.inOut"})
        .from(".cover__btn a", {opacity: 0, y: 150, duration: 1, stagger: 0.3, ease: "power1.inOut"}, 1.7);

gsap.from(".features__title", {
    opacity: 0,
    y: 50,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: ".features",
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
    }
})


// Seleziona l'SVG
const qrCode_blocks = document.querySelectorAll("#qr-code rect, #qr-code svg");

// Animazione di formazione e distruzione
gsap.timeline({ repeat: -1 })  // repeat: -1 significa che il loop è infinito
  .from(qrCode_blocks, {
    delay: 1,
    opacity: 0,
    scale: 0,
    stagger: 0.01, // Ogni blocco appare con un piccolo ritardo
    duration: 2,   // Durata totale dell'animazione di apparizione
    ease: "power2.out"
  })
  .to(qrCode_blocks, {
    delay: 4,
    opacity: 0,
    scale: 0,
    stagger: 0.01, // Ogni blocco scompare con un piccolo ritardo
    duration: 2,
    ease: "power2.in"
  });
