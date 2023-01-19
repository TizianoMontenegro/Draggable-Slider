const carousel = document.querySelector(".wrapper .carousel"),
arrows = document.querySelectorAll(".wrapper i"),
firstImage = carousel.querySelectorAll("img")[0];


let dragPlay = false, prevPage, prevScroll, positionDiff, isDragging = false;

const chooseDragPlay = (e) => {
    dragPlay = true;
    prevPage = e.pageX || e.touches[0].pageX;
    prevScroll = carousel.scrollLeft;
    carousel.classList.add("dragging");
};
const chooseDragPause = () => {
    dragPlay = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
};
const showHideArrows = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrows[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrows[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};
const autoSlide = () => {
    if(carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidt) return;

    positionDiff = Math.abs(positionDiff);
    let widthFirstImage = firstImage.clientWidth + 15;
    let valDiff = widthFirstImage - positionDiff;

    if(carousel.scrollLeft > prevScroll) {
        return carousel.scrollLeft += positionDiff > widthFirstImage / 3 ? valDiff : - positionDiff;
    }else {
        return carousel.scrollLeft -= positionDiff > widthFirstImage / 3 ? valDiff : - positionDiff;
    }
};
const moveSlider = (e) => {
    if (!dragPlay) return;
    e.preventDefault()
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPage;
    carousel.scrollLeft = prevScroll - positionDiff;
    showHideArrows();
};


arrows.forEach(arrow => {
    arrow.addEventListener("click",() => {
        let widthFirstImage = firstImage.clientWidth + 15;
        carousel.scrollLeft += arrow.id == "arrow-left" ? - widthFirstImage : widthFirstImage;
        setTimeout(showHideArrows, 100);
    });
});
showHideArrows()
carousel.addEventListener("mousedown", chooseDragPlay);
carousel.addEventListener("touchstart", chooseDragPlay);

carousel.addEventListener("mousemove", moveSlider);
carousel.addEventListener("touchmove", moveSlider);

carousel.addEventListener("mouseup", chooseDragPause);
carousel.addEventListener("mouseleave", chooseDragPause);
carousel.addEventListener("touchend", chooseDragPause);