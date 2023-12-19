// Fonction pour récupérer les données de l'API
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
    const items = document.getElementById('itemsList').getElementsByTagName('div');
  
    for (let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName('p')[1];
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
    const itemsList = document.getElementById('itemsList');
  
    // Clear the list before adding new items
    itemsList.innerHTML = '';
  
    itemsData.forEach(item => {
      const itemId = item['o:id'];
      const title = item['o:title']; // Correct key for the title
      const mediaUrl = item.thumbnail_display_urls ? item.thumbnail_display_urls.medium : ''; // Correct path for media URL
      const description = item['dcterms:description'] && item['dcterms:description'].length > 0 ? item['dcterms:description'][0]['@value'] : ''; // Correct path for description
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item'; // Add a class for styling
      itemDiv.innerHTML = `
        <p>Identifiant: ${itemId}</p>
        <h2>${title}</h2>
        ${mediaUrl ? `<img src="${mediaUrl}" alt="${title}">` : ''}
        <p>${description}</p>
        <hr>
      `;
      itemsList.appendChild(itemDiv);
    });
  }
  
  
  const votreCleAPI = 'WV0I3V4nNLKrmfZi1b77INV6ZhR642HP';
  getData(votreCleAPI);