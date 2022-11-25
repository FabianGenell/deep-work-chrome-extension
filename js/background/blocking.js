export async function checkBlocked(e) {

    console.log('CheckBlocked')

    if (e.url === 'about:blank') return;

    const tab = await chrome.tabs.get(e.tabId);
    chrome.storage.sync.get(['blockedSites', 'isFocusMode'], (result) => {

        if (!result.isFocusMode) return;

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
}