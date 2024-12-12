function injectScript(scriptPath,) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptPath);
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}
injectScript('twitter-api-interceptor.js');
injectScript('tweet-highlighter.js');

async function sendDataToExtension(data) {
    const response = await chrome.runtime.sendMessage(data);
    console.log(response)
}

let tweetData = null
// Listen for messages from the injected script
window.addEventListener('message', async function (event) {
    if (event.data.type === 'TWEET_DATA_INTERCEPTED') {
        tweetData = event.data.data;
        console.log('Intercepted Tweet Data:', tweetData);

        if (event.data.requestType == 'THREAD')
            await sendDataToExtension({ type: "getTwitterThreadFromContent", data: tweetData })
        else if (event.data.requestType == 'WALL')
            await sendDataToExtension({ type: "getTwitterWallFromContent", data: tweetData })

    }
    // else if(event.data.type === 'HANDLE_TWEET_HIGHLIGHT'){
    //     let highlightText = event.data.data;
    //     console.log('Highlight Tweet:', highlightText);

    //     findAndScrollToText(highlightText)
    // }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(sender.tab ?
    //     "from a content script:" + sender.tab.url :
    //     "from the extension");
    if (message.type === "getSelectedCitationFromExtension") {
        findAndScrollToText(message.data).then(found => {
            if (found) {
                console.log('Tweet found!');
            } else {
                console.log('Tweet not found after all attempts');
            }
        });
        // window.postMessage({
        //     type: 'HANDLE_TWEET_HIGHLIGHT',
        //     data: message.data
        //   }, '*');
        sendResponse({ status: "success" });
    }
}
);