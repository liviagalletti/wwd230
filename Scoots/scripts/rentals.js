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
                    <td>${rental.price.Reservation['Walk-In']['Half Day']}</td>
                    <td>${rental.price.Reservation['Walk-In']['Full Day']}</td>
                    <td>${rental.max_persons}</td>
                    <td>${rental.half_day_price}</td>
                    <td>${rental.full_day_price}</td>
                    <td><img src="images/${rental.image}" alt="${rental.name}"></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
