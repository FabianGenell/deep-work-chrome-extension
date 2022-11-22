chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.get(['settings'], (result) => {

        if (!result.settings) {
            chrome.storage.sync.set({ settings: { hideVideos: true, grayscale: 100, minutes: 90 } })
        }

    });

});



let startTime;

let minuteInterval;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.startTimer) {

            startTime = Date.now();

            chrome.storage.sync.set({ focusTimeStart: startTime });


            minuteInterval = setInterval(() => {
                updateTime(startTime);
            }, 60000);

        } else if (request.startTimer === false) {

            clearInterval(minuteInterval);

        }
    }
);


function updateTime(startTime) {

    const timeElapsed = Date.now() - startTime;
    const minutesElapsed = Math.floor(timeElapsed / 60 / 1000);

    chrome.storage.sync.set({ minutesElapsed });

    chrome.storage.sync.get(['isFocusMode', 'settings'], (result) => {

        console.log(result);

        const isFocusMode = result.isFocusMode;

        if (!isFocusMode) {
            clearInterval(minuteInterval);
        }

        const settings = result.settings;
        if (settings.duration <= minutesElapsed) {
            clearInterval(minuteInterval);


        }


    });

}