const toggleFocusModeEl = document.getElementById('toggleFocusMode');

const timeElapsedEl = document.getElementById('timeElapsed');

let isFocusMode;

chrome.storage.sync.get(['isFocusMode', 'minutesElapsed'], (result) => {

    isFocusMode = result.isFocusMode;

    updateImage(isFocusMode);

    if (isFocusMode) {
        updateTime(result.minutesElapsed);

    }
});

chrome.storage.onChanged.addListener((changes) => {

    if (changes.isFocusMode) {
        updateImage(changes.isFocusMode.newValue);

        chrome.storage.sync.get(['minutesElapsed'], (result) => {
            updateTime(result.minutesElapsed);
        });


    }


    if (changes.minutesElapsed) service.table(changes);


    /*
    BUG HERE (fix above) - when if minutesElapsed is already 0, then it hasn't changed
    even though we are starting a new focus mode - therefor change to message
    */

    if (changes.minutesElapsed) {
        updateTime(changes.minutesElapsed.newValue);
    }

});


toggleFocusModeEl.onclick = function toggleFocusMode() {

    isFocusMode = !isFocusMode;

    chrome.storage.sync.set({ isFocusMode });
}


function updateImage(newFocusMode) {

    if (newFocusMode) {
        toggleFocusModeEl.src = '../images/desk-lamp-on.png';
        timeElapsedEl.style.display = 'block';

    } else if (newFocusMode === false) {
        toggleFocusModeEl.src = '../images/desk-lamp-off.png';
        timeElapsedEl.style.display = 'none';

    }

}

function updateTime(minutesElapsed) {

    timeElapsedEl.innerHTML = `${minutesElapsed} MIN`

}


const service = {
    log(obj) {
        chrome.runtime.sendMessage({ log: obj });
    },
    table(obj) {
        chrome.runtime.sendMessage({ table: obj });
    },
    dir(obj) {
        chrome.runtime.sendMessage({ dir: obj });
    }
}