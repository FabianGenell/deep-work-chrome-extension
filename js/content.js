chrome.storage.sync.get(['isFocusMode', 'settings'], (result) => {

    if (result.isFocusMode) {
        applySettings(result.settings)
    }

});


chrome.storage.onChanged.addListener(function (changes, namespace) {

    console.log(changes)

    //if settings change - change scope settings
    if (changes.settings) {
        settings = changes.settings.newValue;

        console.log(changes.settings.newValue);
    }

    if (changes.isFocusMode.newValue) {
        applySettings();
    } else if (!changes.isFocusMode.newValue) {
        removeAppliedSettings()
    }

});


function applySettings(settings) {

    if (settings.grayscale) {
        document.querySelector('html').style.filter = `grayscale(${settings.grayscale}%)`;
    }

    if (!settings.showVideos) {

        document.querySelectorAll('video').forEach(video => { video.style.visibility = 'hidden'; });

    }

}

function removeAppliedSettings() {

    document.querySelectorAll('video').forEach(video => { video.style.visibility = 'visible'; });

    document.querySelector('html').style.filter = ``;

}


function CloseTab() {

    if (window.confirm("This URL is blocked while in depp work mode. Go back to focus on work by pressing OK")) {
        chrome.runtime.sendMessage({ closeMe: true })
    }
}

