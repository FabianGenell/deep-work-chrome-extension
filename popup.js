const toggleFocusModeEl = document.getElementById('toggleFocusMode');

let isFocusMode;

chrome.storage.sync.get(['isFocusMode', 'focusTimeStart'], (result) => {

    console.log(result);

    isFocusMode = result.isFocusMode;

    if (isFocusMode) {
        focusTimeStart = result.focusTimeStart;
    }

    toggleFocusModeEl.checked = isFocusMode;


});


function toggleFocusMode() {

    isFocusMode = !isFocusMode;

    toggleFocusModeEl.checked = isFocusMode;


    // chrome.runtime.sendMessage({ enableFocusMode: isFocusMode })

    chrome.storage.sync.set({ isFocusMode, focusTimeStart: Date.now() });

    document.querySelector('h2').innerHTML = `isFocusMode: ${isFocusMode}`;

}


toggleFocusModeEl.onchange = (event) => {

    toggleFocusMode();

};
