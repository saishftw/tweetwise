const TWITTER_API_REQUEST_TYPE = {
  THREAD: ["TweetDetail", "TweetResultByRestId"],
  WALL: ["HomeTimeline", "HomeLatestTimeline"]
}

function initInterceptor() {
  initFetchInterceptor()
  initXhrInterceptor()
}

function getTwitterApiRequestType(url) {
  for (const type in TWITTER_API_REQUEST_TYPE) {
    for (const t of TWITTER_API_REQUEST_TYPE[type]) {
      if (url.includes(t)) {
        return type; // Exit immediately if a match is found
      }
    }
  }

  return null; // Return null if no match is found
}

function initFetchInterceptor() {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);

    // Clone the response so we can read it multiple times
    const clone = response.clone();
    const requestType = getTwitterApiRequestType(args[0])
    // Check if this is a tweet request
    if (requestType) {
      try {
        const data = await clone.json();
        // Send the data to the content script
        postTweetData(data.data, requestType)

      } catch (error) {
        console.error('Error processing tweet data:', error);
      }
    }

    return response;
  };
}

function initXhrInterceptor() {
  const XHR = XMLHttpRequest.prototype;
  const open = XHR.open;
  const send = XHR.send;

  XHR.open = function (method, url) {
    this._url = url;
    return open.apply(this, arguments);
  };

  XHR.send = function () {
    // Attach an event listener to capture the response
    this.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) { // Ready state 4 means the request is complete
        const requestType = getTwitterApiRequestType(this._url)
        if (requestType) {
          console.log("Intercepted URL:", this._url);
          try {
            const data = JSON.parse(this.responseText);
            postTweetData(data.data, requestType)
          } catch (error) {
            console.error('Error processing XHR tweet data:', error);
          }
        }
      }
    });

    return send.apply(this, arguments);
  };
}

function postTweetData(data, requestType) {
  window.postMessage({
    type: 'TWEET_DATA_INTERCEPTED',
    data: data,
    requestType: requestType
  }, '*');
}

initInterceptor()

console.log('Tweet interceptors installed')