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