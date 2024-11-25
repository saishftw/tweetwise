// Inject the interceptor script immediately
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

let currTweetDataRaw = null

// Listen for messages from the injected script
// const _this = this
window.addEventListener('message', function (event) {
    // Make sure the message is from our script
    if (event.data.type === 'TWEET_DATA_INTERCEPTED') {
        const tweetData = event.data.data;
        console.log('Intercepted Tweet Data:', tweetData);
        currTweetDataRaw = tweetData

        chrome.runtime.sendMessage({ type: "getTweetDataFromContent", payload: currTweetDataRaw });
    }
});