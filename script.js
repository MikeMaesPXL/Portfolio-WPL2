// -- Burger menu --
const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".nav-links")

    menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
})



// -- Image carousel --
const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, isDragging = false, prevScrollLeft, positionDiff;

const showHiddenIcons = () => {
    // Showing and hiding icons depending on scroll left
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // Getting max scroll width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // Take first image width and adding 14 -> margin
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHiddenIcons(), 60); // Call the icons after 60ms
    });
});

const autoSlide = () => {
    // If no image left then return ->
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { //Scrolling right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // Scrolling left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // Updating var on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // Scrolling images left
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHiddenIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);



// -- Change color of nav on section scroll --
const header = document.querySelector("header");
const sectionOne = document.querySelector(".section-1");
const sectionTwo = document.querySelector(".section-2");
const sectionThree = document.querySelector(".section-3");
const sectionFour = document.querySelector(".section-4");

const sectionOptions = {
    rootMargin: "-50px 0px 0px 0px",
    threshold: 0,
};

const sectionDarkObserver = new IntersectionObserver(
    function(
        entries
    ) {
    entries.forEach(entry => {
        console.log(header.classList);
        if(!entry.isIntersecting) {
            console.log("entering the light...");
            header.classList.remove('nav-scroll');
        } else {
            console.log("entering the dark...");
            header.classList.add('nav-scroll');
        }
    })
}, sectionOptions);

// sectionDarkObserver.observe(sectionOne);
sectionDarkObserver.observe(sectionTwo);
sectionDarkObserver.observe(sectionThree);

// const sectionLightObserver = new IntersectionObserver(
//     function(
//         entries
//     ) {
//     entries.forEach(entry => {
//         console.log(header.classList);
//         if(!entry.isIntersecting) {
//             header.classList.add('nav-scroll');
//         } else {
//             header.classList.remove('nav-scroll');
//         }
//     })
// }, sectionOptions);



// -- Image pop up on click --
// let img = document.querySelectorAll("tile-img");

// img.addEventListener('click', () => {
//     img.style.transform = "scale(1.5)";
//     img.style.transition = "transform 0.25s ease";
// });

// const imageResize = () => {
//     img.style.transform = "scale(1.5)";
//     img.style.transition = "transform 0.25s ease";
// }

// const imageReset = () => {
//     img.style.transform = "scale(1)";
//     img.style.transition = "transform 0.25s ease";
// }