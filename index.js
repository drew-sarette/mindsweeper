document.getElementById("main-menu-button").addEventListener("click", toggleMenu);
document.querySelectorAll(".content-item").forEach(element => {
    element.addEventListener("click", toggleMenuItem(element));
});

function toggleMenu() {
    document.querySelector(".content-area").classList.toggle("show-main-menu");
}