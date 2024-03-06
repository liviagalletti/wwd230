
const baseUrl = "https://liviagalletti.github.io/wdd230/";
const linkUrl = "https://liviagalletti.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linkUrl);
        const data = await response.json();
        displayLinks(data);
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

getLinks();

function displayLinks(weeks) {
    const linksContainer = document.querySelector('#links');

    weeks.forEach(week => {
        const weekTitle = document.createElement('h2');
        weekTitle.textContent = `Week ${week.week}`;
        linksContainer.appendChild(weekTitle);

        const linksList = document.createElement('ul');
        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const linkElement = document.createElement('a');
            linkElement.textContent = link.title;
            linkElement.setAttribute('href', link.url);
            listItem.appendChild(linkElement);
            linksList.appendChild(listItem);
        });

        linksContainer.appendChild(linksList);
    });
}

