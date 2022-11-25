const siteInputForm = document.getElementById('siteInput');
const siteInputButtonEl = document.getElementById('siteInputButton');


let blockedSites = chrome.storage.sync.get(['blockedSites'], (result) => result.blockedSites);

blockedSites.forEach(element => {
    addSite(Object.values(element)[0]);
});

siteInputForm.onsubmit = (e) => {
    e.preventDefault();

    console.log(siteInputForm.site.value)

    addSite(siteInputForm.site.value);

    blockedSites.push({ hostContains: siteInputForm.site.value })

    chrome.storage.sync.set({ blockedSites });

    siteInputForm.site.value = '';

}

function addSite(string) {

    if (string.length > 70) return;

    const siteElement = document.createElement('div');
    siteElement.className = 'site';
    siteElement.innerHTML = `<p>${string}</p>
    <button class="delete-button">X</button>`;

    siteInputForm.parentElement.insertAdjacentElement('afterend', siteElement);

}

// function createDeleteButtons() {
//     const deleteButtons = document.querySelectorAll('.delete-button');

//     deleteButtons.forEach(element => {
//         deleteButtons.pop();
//         element.addEventListener('click', () => {
//             element.parentElement.remove();

//         });
//     });
// }

// createDeleteButtons();