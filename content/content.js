const settings = {
    grayscale: 100,
    showVideos: false,

}


chrome.runtime.onMessage.addListener((message) => {
    if (message.enableFocusMode) {
        applySettings();
    }
});

function applySettings() {

    if (settings.grayscale) {
        document.querySelector('html').style.filter = `grayscale(${settings.grayscale}%)`;
    }

    if (!settings.showVideos) {
        document.querySelectorAll('video').style.visibility = 'hidden';
    }



}

function CloseTab() {

    if (window.confirm("This URL is blocked while in depp work mode. Go back to focus on work by pressing OK")) {
        chrome.runtime.sendMessage({ closeMe: true })
    }
}





//REMOVE THIS

applySettings();

setInterval(() => {
    console.log('Content script is running')

}, 3000);
