'use strict';

const endFocusModeButton = document.getElementById('endFocusModeButton');

const closeButton = document.getElementById('closeButton');

closeButton.onclick = () => window.close();


endFocusModeButton.onclick = () => {
    chrome.storage.sync.set({ isFocusMode: false });

}

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());