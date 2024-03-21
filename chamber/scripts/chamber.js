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

