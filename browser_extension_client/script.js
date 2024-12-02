const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// Configure marked options
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
});

const CHAT_KEYWORDS = {
    '/SUMMARY': 'SUMMARIZE',
    '/SENTIMENT-CHECK': 'SENTIMENT',
    '/FACT-CHECK': 'FACTCHECK'
};

let loadingIndicator = null

function createLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading-dots');
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        loadingDiv.appendChild(dot);
    }
    return loadingDiv;
}

function addMessage(message, isUser = false) {
    if (!isUser && loadingIndicator) loadingIndicator.remove()

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

    // Parse markdown if it's a bot message
    if (!isUser) {
        messageDiv.innerHTML = marked.parse(message);
    } else {
        messageDiv.textContent = message;
    }

    chatMessages.insertBefore(messageDiv, chatMessages.firstChild);
}

// function addFileAttachment(filename) {
//     const attachmentDiv = document.createElement('div');
//     attachmentDiv.classList.add('file-attachment');

//     const fileIcon = document.createElement('div');
//     fileIcon.classList.add('file-icon');
//     fileIcon.textContent = 'CSV';

//     const fileInfo = document.createElement('div');
//     fileInfo.style.flex = 1;
//     fileInfo.textContent = filename;

//     const downloadButton = document.createElement('button');
//     downloadButton.classList.add('download-button');
//     downloadButton.innerHTML = `
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-linecap="round" stroke-linejoin="round"/>
//     </svg>
//   `;

//     attachmentDiv.appendChild(fileIcon);
//     attachmentDiv.appendChild(fileInfo);
//     attachmentDiv.appendChild(downloadButton);
//     chatMessages.insertBefore(attachmentDiv, chatMessages.firstChild);
// }

function getTweetData() {
    return chrome.storage.session.get(["tweetData"]).then((result) => {
        return result.tweetData ?? null
    });
}

addMessage("Hello, I'm **TweetWise**, your Twitter assistant! Need a quick summary, a fact check, or sentiment analysis? Just tag me with `/summary`, `/fact-check`, or `/sentiment-check`, and I'll do the rest!")

async function handleSend() {
    const message = chatInput.value.trim();
    if (message) {
        try {

            addMessage(message, true);
            chatInput.value = '';

            // Add loading indicator
            loadingIndicator = createLoadingIndicator();
            chatMessages.insertBefore(loadingIndicator, chatMessages.firstChild);

            let actionData = interpretUserMessage(message)

            if (!actionData) {
                addMessage("Hi there! Please type one of the following keywords to proceed: '/summary,' '/fact-check,' or '/sentiment-check.'")
                return
            }

            let currTweetData = await getTweetData()
            if (!currTweetData) {
                addMessage("Please open the Twitter thread you'd like me to analyze. Once you have it open, let me know whether you'd like a summary, fact-check, or sentiment-check, and I'll guide you from there!")
                return
            }

            let parsedTweet = parseTweet(currTweetData)

            let data = {
                action: actionData.action,
                twitter_thread: parsedTweet
            }
            let response = await generateResponse(data)
            addMessage(response)
        }
        catch (e) {
            addMessage("Oops! Something went wrong, please refresh and try again.")
            console.error(e)
        }
    }
}

function interpretUserMessage(message) {
    const upperText = message.toUpperCase();
    // Check for each keyword
    for (const [keyword, action] of Object.entries(CHAT_KEYWORDS)) {
        const upperKeyword = keyword.toUpperCase();
        if (upperText.includes(upperKeyword)) {
            // Find the text after the keyword
            const startIndex = message.toLowerCase().indexOf(keyword.toLowerCase()) + keyword.length;
            const actionText = message.slice(startIndex).trim();

            // Create the action object
            actionObject = {
                action: action,
                text: actionText
            };

            return actionObject
        }
    }

    return null
}

// Convert existing messages to markdown
document.querySelectorAll('.bot-message').forEach(message => {
    message.innerHTML = marked.parse(message.textContent);
});

// Event Listeners
sendButton.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});