importScripts('tweet-parser.js');

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getTwitterThreadFromContent") {
        let parsedThread = parseTwitterThread(message.data)
        const twitterRequestType = "THREAD"
        let currTwitterThread = chrome.storage.session.get(["twitterData"]).then((result) => {
            return result.twitterData ?? null
        });

        if (parsedThread) {
            // To handle new tweet data or paginated tweet data
            if (!parsedThread.original_tweet)
                currTwitterThread.replies.push(...parsedThread.replies)
            else
                currTwitterThread = parsedThread

            chrome.storage.session.set({ "twitterData": currTwitterThread }).then(() => {
                console.log("Chrome storage value set: twitterData");
            });
            chrome.storage.session.set({ "twitterRequestType": twitterRequestType }).then(() => {
                console.log("Chrome storage value set: twitterRequestType");
            });

            console.log(currTwitterThread)
            console.log('Request Type: ' + twitterRequestType)

            sendResponse({ status: "success" });
        }
        else {
            sendResponse({ status: "error", detail: "Invalid twitter thread data" });
        }
    }

    if (message.type === "getTwitterWallFromContent") {
        let parsedWall = parseTwitterWall(message.data)
        const twitterRequestType = "WALL"

        if (parsedWall) {
            chrome.storage.session.set({ "twitterData": parsedWall }).then(() => {
                console.log("Chrome storage value set: twitterData");
            });
            chrome.storage.session.set({ "twitterRequestType": twitterRequestType }).then(() => {
                console.log("Chrome storage value set: twitterRequestType");
            });
            
            console.log('Request Type: ' + twitterRequestType)
            sendResponse({ status: "success" });
        }
        else {
            sendResponse({ status: "error", detail: "Invalid twitter wall data" });
        }
    }
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == 'selectedCitation') {
            const data = { "type": "getSelectedCitationFromExtension", "data": newValue }
            await sendDataToContent(data)
        }

    }
});

async function sendDataToContent(data) {
    // const data = { "type": "getSelectedCitationFromExtension", "data": data }
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, data);
    // do something with response here, not outside the function
    console.log(response);
};