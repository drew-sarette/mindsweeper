document.getElementById("main-menu-button").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".content-area").classList.toggle("show-main-menu");
}