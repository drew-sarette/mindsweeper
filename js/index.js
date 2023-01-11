document.getElementById("help-button").addEventListener("click", toggleHelp);
document.getElementById("close-help").addEventListener("click", toggleHelp);

function toggleHelp() {
    const helpArea = document.querySelector(".help-area");
    const isVisible = !(helpArea.classList.contains("display-none"));
    console.log(`${helpArea} ${isVisible}`);
    if (isVisible){
        helpArea.classList.add("display-none");
    } else {
        helpArea.classList.remove("display-none");
    }
}