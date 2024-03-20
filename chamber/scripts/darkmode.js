const modeButton = document.querySelector("#dark-mode-toggle");
const main = document.querySelector("main");

modeButton.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        modeButton.textContent = "🕶️";
    } else {
        document.body.classList.add("dark-mode");
        modeButton.textContent = "🔆";
    }
});
