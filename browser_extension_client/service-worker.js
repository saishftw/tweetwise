const TWITTER_ORIGIN = 'https://x.com';

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

let currTweetDataRawBg = null;
// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getTweetDataFromContent") {
        currTweetDataRawBg = message.data;
        sendResponse({ status: "success" });
        
        chrome.storage.session.set({ "tweetData": currTweetDataRawBg }).then(() => {
            console.log("Value was set");
        });
        console.log("Data stored in background:", currTweetDataRawBg);
    }
    else if (message.type === "getTweetDataFromBackground") {
        sendResponse({ data: currTweetDataRawBg }); // Send the stored data
    }
});