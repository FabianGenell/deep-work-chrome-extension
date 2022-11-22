const toggleFocusModeEl = document.getElementById('toggleFocusMode');

const timeElapsedEl = document.getElementById('timeElapsed');

let isFocusMode;

chrome.storage.sync.get(['isFocusMode', 'minutesElapsed'], (result) => {

    isFocusMode = result.isFocusMode;

    if (isFocusMode && result.focusTimeStart) {
        focusTimeStart = result.focusTimeStart;

        updateTime(focusTimeStart);
    }

    toggleFocusModeEl.checked = isFocusMode;


});


function updateTime(startTime) {

    let minutesElapsed = Math.floor((Date.now() - startTime) / 60 / 1000);
    timeElapsedEl.innerHTML = `${minutesElapsed} minutes`


}

function toggleFocusMode() {

    isFocusMode = !isFocusMode;

    toggleFocusModeEl.checked = isFocusMode;

    chrome.storage.sync.set({ isFocusMode });

    chrome.runtime.sendMessage({ startTimer: true });

}


toggleFocusModeEl.onchange = (event) => {

    toggleFocusMode();

}
