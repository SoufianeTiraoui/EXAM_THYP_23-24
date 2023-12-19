function getData(apiKey) {
    const apiUrl = 'http://localhost/omeka-s/api/items?pretty_print=1'; 
    fetch(apiUrl, {
        headers: {
            'Authorization': apiKey,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => showItems(data))
    .catch(error => console.error('Erreur :', error));
}

function filterItems() {
    const filterInput = document.getElementById('filterInput');
    const filterValue = filterInput.value.toUpperCase();
    const items = document.getElementById('items-container').getElementsByClassName('item');

    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('h2')[0];
        if (title) {
            const txtValue = title.textContent || title.innerText;
            if (txtValue.toUpperCase().indexOf(filterValue) > -1) {
                items[i].style.display = '';
            } else {
                items[i].style.display = 'none';
            }
        }
    }
}

// Fonction pour afficher la liste des items
function showItems(itemsData) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    itemsData.forEach(item => {
        const itemId = item['o:id'];
        const title = item['o:title']; 
        const mediaUrl = item.thumbnail_display_urls ? item.thumbnail_display_urls.medium : ''; 
        const description = item['dcterms:description'] && item['dcterms:description'].length > 0 ? item['dcterms:description'][0]['@value'] : ''; 

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <p>Identifiant: ${itemId}</p>
            <h2>${title}</h2>
            ${mediaUrl ? `<img src="${mediaUrl}" alt="${title}">` : ''}
            <p>Description: ${description}</p>
            <hr>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

const votreCleAPI = 'WV0I3V4nNLKrmfZi1b77INV6ZhR642HP';
getData(votreCleAPI);
