
const baseUrl = "https://liviagalletti.github.io/wdd230/";
const linkUrl = "https://liviagalletti.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linkUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayLinks(data.lessons); // Assuming "lessons" is the correct property name in your JSON data
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}


getLinks();

function displayLinks(lessons) {
    const linksContainer = document.querySelector('#links');

    lessons.forEach(lesson => {
        const lessonDiv = document.createElement('div');
        lessonDiv.classList.add('lesson');

        const weekLinksContainer = document.createElement('div');
        lesson.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.textContent = `Week ${lesson.lesson}: ${link.title}`;
            linkElement.setAttribute('href', link.url);
            weekLinksContainer.appendChild(linkElement);
            
            // Add separator if not the last link
            if (index < lesson.links.length - 1) {
                const separator = document.createElement('span');
                separator.textContent = ' | ';
                weekLinksContainer.appendChild(separator);
            }
        });

        lessonDiv.appendChild(weekLinksContainer);
        linksContainer.appendChild(lessonDiv);
    });
}
