function injectInterceptor() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('interceptor.js');
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}
// Inject the interceptor script
injectInterceptor();

async function sendDataToExtension(data) {
    const response = await chrome.runtime.sendMessage(data);
    console.log(response)
}

let currTweetDataRaw = null

// Listen for messages from the injected script
window.addEventListener('message', async function (event) {
    if (event.data.type === 'TWEET_DATA_INTERCEPTED') {
        const tweetData = event.data.data;
        console.log('Intercepted Tweet Data:', tweetData);
        currTweetDataRaw = tweetData

        await sendDataToExtension({ type: "getTweetDataFromContent", data: currTweetDataRaw })
    }
});