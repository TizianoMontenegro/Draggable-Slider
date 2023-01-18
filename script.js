const carousel = document.querySelector(".wrapper .carousel"),
arrows = document.querySelectorAll(".wrapper i"),
firstImage = carousel.querySelectorAll("img")[0];


let dragPlay = false;
let prevPage, prevScroll;

const chooseDragPlay = (e) => {
    dragPlay = true;
    prevPage = e.pageX;
    prevScroll = carousel.scrollLeft;
}
const chooseDragPause = () => {
    dragPlay = false;
}
const moveSlider = (e) => {
    if (!dragPlay) return;
    // e.preventDefault()
    let positionDiff = e.pageX - prevPage;
    carousel.scrollLeft = prevScroll - positionDiff
}

arrows.forEach(arrow => {
    arrow.addEventListener("click",() => {
        let widthFirstImage = firstImage.clientWidth + 15;
        carousel.scrollLeft += arrow.className == "to-left" ? - widthFirstImage : widthFirstImage;
    })
})

carousel.addEventListener("mousedown", chooseDragPlay)
carousel.addEventListener("mousemove", moveSlider)
carousel.addEventListener("mouseup", chooseDragPause)
console.log(firstImage)