// JavaScript for toggling dark mode
const modeButton = document.querySelector("#mode");
const body = document.body;
const main = document.querySelector("main");

modeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        main.style.background = "#000";
        main.style.color = "#fff";
        modeButton.textContent = "🔆";
    } else {
        main.style.background = "#eee";
        main.style.color = "#000";
        modeButton.textContent = "🕶️";
    }
});


// Get the menu button and navigation element
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Add event listener to toggle navigation visibility
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
});
