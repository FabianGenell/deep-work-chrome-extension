let blockedSites;

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.get(['settings', 'blockedSites'], (result) => {

        if (!result.settings) {
            chrome.storage.sync.set({ settings: { hideVideos: true, grayscale: 100, minutes: 90 } })
        }


        if (!result.blockedSites) {
            chrome.storage.sync.set({
                blockedSites: [
                    'youtube.com',
                    'tiktok.com',
                    'instagram.com',
                    'netflix.com',
                    'hbo.com',
                    'hbonordic.com',
                    'disneyplus.com',
                    'twitter.com',
                    'reddit.com',
                    '9gag.com',
                    'hulu.com',
                ]
            });
        }
    });

});

chrome.runtime.onMessage.addListener((request) => {
    if (request.log) {
        // console.dir({ sender, request });
        console.log(request.log);
    }
    if (request.table) {
        console.table(request.table);
    }
    if (request.dir) {
        console.dir(request.dir);
    }
});

chrome.webNavigation.onCommitted.addListener(async function (e) {

    if (e.url === 'about:blank') return;

    const tab = await chrome.tabs.get(e.tabId);
    chrome.storage.sync.get(['blockedSites'], (result) => {

        const blockedSites = result.blockedSites;

        // console.table({
        //     eMatch: checkMatch(blockedSites, e.url),
        //     eURL: e.url,
        //     tabMatch: checkMatch(blockedSites, e.url),
        //     tabURL: tab.url
        // });

        function checkMatch(array, url) {
            let host = url.split('/')[2];
            return array.some((blocked) => {
                const blockedRegex = new RegExp(`${blocked}`, 'i');
                // console.log(blockedRegex + ' matches ' + host)
                return host.match(blockedRegex);
            });

        }

        //URL is relative from manifest.json (not this file)
        if (checkMatch(blockedSites, e.url) && checkMatch(blockedSites, tab.url)) {
            // console.log(tab.url + ' blocked');
            chrome.tabs.update(e.tabId, { url: './site-blocker/site-blocked.html' });

        }
    });
});

chrome.storage.sync.get(['isFocusMode'], (result) => {

    if (result.isFocusMode) {
        console.log('isFocusMode on background restart - starting timer')
        startFocusTimer();
    }
});


let minuteInterval;

chrome.storage.onChanged.addListener(function (changes) {

    if (changes.isFocusMode) {

        const isFocusMode = changes.isFocusMode.newValue;

        if (isFocusMode === true) {
            const startTime = Date.now();

            chrome.storage.sync.set({ startTime });
            startFocusTimer();

        } else if (isFocusMode === false) {
            chrome.storage.sync.get(['minutesElapsed', 'settings'], (result) => {

                endFocusMode(result.minutesElapsed, result.settings.minutes);
            });
        }
    }

});



function endFocusMode(minutesElapsed, minutes) {

    console.log('Ending focus mode!');

    clearInterval(minuteInterval);

    if (minutesElapsed > minutes * .9) {

        console.log('90%+')


    } else if (minutesElapsed > minutes * .5) {

        console.log('50%+')

    }
}

function startFocusTimer() {
    clearInterval(minuteInterval);

    chrome.storage.sync.get(['startTime'], (result) => {

        updateTime(result.startTime);
        //update time every 60 seconds
        minuteInterval = setInterval(() => {
            updateTime(result.startTime);
        }, 60000);
    });

}

function updateTime(startTime) {

    const timeElapsed = Date.now() - startTime;
    const minutesElapsed = Math.floor(timeElapsed / 60 / 1000);

    chrome.storage.sync.set({ minutesElapsed });

    //Check if focus session should end
    chrome.storage.sync.get(['isFocusMode', 'settings'], (result) => {
        const settings = result.settings;

        if (minutesElapsed >= settings.minutes) {

            console.log(`time elapsed (${minutesElapsed} >= ${settings.minutes})`);
            chrome.storage.sync.set({ isFocusMode: false });

        }

    });
}
