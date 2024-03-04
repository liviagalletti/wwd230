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

const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `Welcome! Let us know if you have any questions`;
}
numVisits++;
localStorage.setItem("numVisits-ls", numVisits);



    document.addEventListener('DOMContentLoaded', function() {
        // Obtenha o elemento de input oculto
        var timestampInput = document.getElementById('timestamp');
        
        // Obtenha o tempo atual em milissegundos
        var currentTime = Date.now();
        
        // Defina o valor do campo de entrada oculto como o tempo atual
        timestampInput.value = currentTime;
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Get the form element
        var form = document.getElementById('myForm');

        // Add event listener for form submission
        form.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();

            window.location.href = 'thankyou.html';
        });
    });

