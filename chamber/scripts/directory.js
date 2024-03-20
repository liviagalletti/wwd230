document.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
    fetch('https://liviagalletti.github.io/wdd230/chamber/data/members.json') 
        .then(response => response.json())
        .then(data => displayData(data.companies))
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(companies) {
    const linksContainer = document.getElementById('links');

    companies.forEach(company => {
        const link = document.createElement('a');
        link.href = company.website;
        link.target = '_blank'; // Open links in a new tab

        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');

        const logo = document.createElement('img');
        logo.src = `images/${company.image}`;
        logo.alt = `${company.name} Logo`;

        const companyName = document.createElement('h2');
        companyName.textContent = company.name;

        const address = document.createElement('p');
        address.textContent = company.address;

        const phone = document.createElement('p');
        phone.textContent = company.phone;

        const membershipLevel = document.createElement('p');
        membershipLevel.textContent = `Membership Level: ${company.membership_level}`;

        const additionalInfo = document.createElement('p');
        additionalInfo.textContent = company.additional_info;

        companyCard.appendChild(logo);
        companyCard.appendChild(companyName);
        companyCard.appendChild(address);
        companyCard.appendChild(phone);
        companyCard.appendChild(membershipLevel);
        companyCard.appendChild(additionalInfo);

        link.appendChild(companyCard);
        linksContainer.appendChild(link);
    });
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
