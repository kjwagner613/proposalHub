const overlay = document.getElementById("zoom-overlay");
const zoomed = document.getElementById("zoomed-img");

document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
        zoomed.src = img.src;
        overlay.style.display = "flex";
    });
} ) ;
 
overlay.addEventListener("click", () => {
    overlay.style.display = "none";
});