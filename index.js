document.getElementById("help-button").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".help-area").classList.toggle("show-help");
}