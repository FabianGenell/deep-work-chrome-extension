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

    console.log(changes)

    if (changes.isFocusMode) {
        updateImage(changes.isFocusMode.newValue);

    }

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