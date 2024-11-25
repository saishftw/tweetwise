// This file contains the injection code
console.log('Fetch interceptor injected');
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  // Clone the response so we can read it multiple times
  const clone = response.clone();

  // Check if this is a tweet request
  if (args[0].includes('TweetResultByRestId') || args[0].includes('TweetDetail')) {
    try {
      const data = await clone.json();
      // Send the data to the content script
      postTweetData(data)

    } catch (error) {
      console.error('Error processing tweet data:', error);
    }
  }

  return response;
};

// Also intercept XHR requests as backup
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
      if (this._url.includes("TweetDetail")) {
        console.log("Intercepted URL:", this._url);
        console.log("Response Data:", this.responseText);
        try {
          const data = JSON.parse(this.responseText);
          postTweetData(data)
        } catch (error) {
          console.error('Error processing XHR tweet data:', error);
        }
      }
    }
  });

  // this.addEventListener('load', function () {
  // if (this._url.includes('TweetResultByRestId') || this._url.includes('TweetDetail')) {
  //   const originalOnReadyStateChange = this.onreadystatechange;
  //   this.onreadystatechange = function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       try {
  //         const data = JSON.parse(this.responseText);
  //         console.log('Intercepted tweet XHR:', this._url);
  //         handleTweetData(data)
  //       } catch (error) {
  //         console.error('Error processing XHR tweet data:', error);
  //       }
  //     }

  //     if (originalOnReadyStateChange) {
  //       originalOnReadyStateChange.apply(this, arguments);
  //     }
  //   }
  // }
  // });
  return send.apply(this, arguments);
};

function postTweetData(data) {
  window.postMessage({
    type: 'TWEET_DATA_INTERCEPTED',
    data: data.data
  }, '*');
}

console.log('Tweet interceptors installed')