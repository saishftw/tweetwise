const TWITTER_ORIGIN = 'https://x.com';

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    // Enables the side panel on google.com
    if (url.origin === TWITTER_ORIGIN) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'sidepanel.html',
            enabled: true
        });
    } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});

let currTweetDataRawBg = null;
// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getTweetDataFromContent") {
        currTweetDataRawBg = message.payload; // Store the data
        console.log("Data stored in background:", currTweetDataRawBg);
        // sendResponse({ status: "success" });
    }
    else if (message.type === "getTweetDataFromBackground") {
        sendResponse({ data: currTweetDataRawBg }); // Send the stored data
    }
});

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
        if (msg.type === "getTweetDataFromBackground") {
            port.postMessage({ data: currTweetDataRawBg });
        }
    });
});