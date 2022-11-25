const formEl = document.getElementById('settingsForm');
const editSitesButtonEl = document.getElementById('editSites');

let settings;

chrome.storage.sync.get(['settings'], (result) => {

    settings = result.settings;

    formEl.elements.hideVideos.checked = settings.hideVideos;

    formEl.elements.grayscale.value = settings.grayscale;

    formEl.elements.minutes.value = settings.minutes;

});


formEl.onchange = (event) => {

    let value = event.srcElement.value;
    let name = event.srcElement.name;

    if (event.srcElement.type === 'checkbox') {
        value = event.srcElement.checked
    }

    settings[name] = value;

    chrome.storage.sync.set({ settings });

}
