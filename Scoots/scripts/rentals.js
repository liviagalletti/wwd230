// rentals.js


document.addEventListener("DOMContentLoaded", function () {
    fetch('data/rentals.json')
        .then(response => response.json())
        .then(data => {
            const rentals = data.rentals;
            const tableBody = document.querySelector('#rentalsTable tbody');

            rentals.forEach(rental => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${rental.name}</td>
                    <td>$${rental.price}</td>
                    <td><img src="images/${rental.image}" alt="${rental.name}"></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
