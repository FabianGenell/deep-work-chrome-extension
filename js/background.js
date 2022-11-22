chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.get(['settings'], (result) => {

        if (!result.settings) {
            chrome.storage.sync.set({ settings: { hideVideos: true, grayscale: 100, minutes: 90 } })
        }

    });

});



let startTime;

let minuteInterval;

chrome.storage.onChanged.addListener(function (changes, namespace) {

    if (changes.isFocusMode) {

        const isFocusMode = changes.isFocusMode.newValue;

        if (isFocusMode === true) {

            startTime = Date.now();

            //update time (0 min)
            updateTime(startTime);

            chrome.storage.sync.set({ startTime });

            //update time every 60 seconds
            minuteInterval = setInterval(() => {
                updateTime(startTime);
            }, 60000);

        } else if (isFocusMode === false) {

            chrome.storage.sync.get(['minutesElapsed', 'settings'], (result) => {

                endFocusMode(result.minutesElapsed, result.settings.duration);

            });
        }

    }


});


function updateTime(startTime) {

    const timeElapsed = Date.now() - startTime;
    const minutesElapsed = Math.floor(timeElapsed / 60 / 1000);

    chrome.storage.sync.set({ minutesElapsed });

    //Check if focus session should end
    chrome.storage.sync.get(['isFocusMode', 'settings'], (result) => {

        const settings = result.settings;

        if (!result.isFocusMode || settings.duration <= minutesElapsed) {

            endFocusMode(minutesElapsed, settings.duration);

        }

    });
}


function endFocusMode(minutesElapsed, duration) {

    console.log('Ending focus mode!');

    clearInterval(minuteInterval);

    if (minutesElapsed > duration * .9) {



    } else if (minutesElapsed > duration * .5) {



    }


}