let globalData;
const apiKey = 'WV0I3V4nNLKrmfZi1b77INV6ZhR642HP';
const apiUrl = 'http://localhost/omeka-s/api/items?pretty_print=1';

// Fetch the data and populate the dropdown
fetch(apiUrl, {
    headers: {
        'Authorization': apiKey,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    globalData = data;
    showItems(data);
    populateSubjectsDropdown(data);
})
.catch(error => console.error('Erreur :', error));

// Populate the subjects dropdown
function populateSubjectsDropdown(data) {
    let subjects = new Set();
    data.forEach(item => {
        if (item['dcterms:subject']) {
            item['dcterms:subject'].forEach(subject => {
                subjects.add(subject['@value']);
            });
        }
    });
    const selectSubjects = document.getElementById('selectSubjects');
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        selectSubjects.appendChild(option);
    });
}

// Filter items based on the selected subject
function filterItems() {
    const selectedSubject = document.getElementById('selectSubjects').value;
    const filteredData = globalData.filter(item => {
        return item['dcterms:subject'] && item['dcterms:subject'].some(subject => subject['@value'] === selectedSubject);
    });
    showItems(selectedSubject ? filteredData : globalData);
}

// Show items on the page
function showItems(data) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    data.forEach(item => {
        const itemId = item['o:id'];
        const title = item['o:title'];
        const mediaUrl = item.thumbnail_display_urls ? item.thumbnail_display_urls.medium : '';
        const description = item['dcterms:description'] ? item['dcterms:description'][0]['@value'] : '';

        const colDiv = document.createElement('div');
        colDiv.className = 'col-sm-4 mb-12';
        colDiv.style.marginBottom = '13px';
        colDiv.innerHTML = `
            <div class="card">
                <img src="${mediaUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        `;
        itemsContainer.appendChild(colDiv);
    });
}
