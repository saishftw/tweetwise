// Function to inject the input listener
function injectInputListener() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('input-listener-inject.js');
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

// Inject the input listener script
injectInputListener();

// Listen for action messages
window.addEventListener('message', async function (event) {
    if (event.data && event.data.type === 'OMNIBOT_ACTION') {
        const actionData = event.data.data;
        console.log('Content script received action:', actionData);

        if(!currTweetDataRaw){
            alert("No Tweet found to process. Please select a Twitter thread and comment '@omnibot_x {KEYWORD}'")
            return
        }
        
        let parsedTweet = parseTweet(currTweetDataRaw)
        
        let data = {
            action: actionData.action,
            twitter_thread: parsedTweet
        }
        let response = await generateResponse(data)
        console.log(parsedTweet)
        console.log(`RESPONSE: ${response}`)
        // processAction(actionData);
    }
});

function processAction(actionData) {
    // You can add specific handling for each action type here
    switch (actionData.action) {
        case 'SUMMARIZE':
            console.log('Processing summarize action:', actionData);
            break;
        case 'SENTIMENTCHECK':
            console.log('Processing sentiment check action:', actionData);
            break;
        case 'FACTCHECK':
            console.log('Processing fact check action:', actionData);
            break;
    }
}