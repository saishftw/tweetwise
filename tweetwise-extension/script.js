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

const ACTIONS = {
    "SUMMARY": "SUMMARY",
    "SENTIMENT": "SENTIMENT",
    "FACTCHECK": "FACTCHECK",
    "SIMPLIFY": "SIMPLIFY",
    "QUERY": "QUERY"
}

const ACTION_KEYWORDS = {
    '/SUMMARY': ACTIONS.SUMMARY,
    '/SENTIMENT': ACTIONS.SENTIMENT,
    '/FACTCHECK': ACTIONS.FACTCHECK
};

let loadingIndicator = null
let conversationId = null

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
        // messageDiv.innerHTML = marked.use(markedFootnote()).parse(message);
        messageDiv.innerHTML = parseMarkdown(message)
    } else {
        messageDiv.textContent = message;
    }

    chatMessages.insertBefore(messageDiv, chatMessages.firstChild);
}

async function getTwitterData() {
    const twitterData = await chrome.storage.session.get(["twitterData"]).then((result) => result.twitterData ?? null);

    const twitterRequestType = await chrome.storage.session.get(["twitterRequestType"]).then((result) => result.twitterRequestType ?? null);

    return { twitterData, twitterRequestType }
}

function startChat() {
    const greeting = "Hello, I'm **TweetWise**, your X assistant! You can start chatting directly with the thread or feed, or use commands by typing `'/'`'."
    addMessage(greeting)
}


async function handleSend() {
    hideCommandPopup()

    const userMessage = chatInput.value.trim();
    if (userMessage) {
        try {

            addMessage(userMessage, true);
            chatInput.value = '';

            // Add loading indicator
            loadingIndicator = createLoadingIndicator();
            chatMessages.insertBefore(loadingIndicator, chatMessages.firstChild);

            // if (!actionData) {
            //     addMessage("Hi there! Please type one of the following keywords to proceed: '/summary,' '/fact-check,' or '/sentiment-check.'")
            //     return
            // }

            let { twitterData, twitterRequestType } = await getTwitterData()
            if (!twitterData) {
                addMessage("Please open a Twitter/X thread or Feed you'd like me to analyze. If you already have one opened, try refreshing the page. Once you have it open, you can start chatting or use commands!")
                return
            }

            let actionData = interpretUserMessage(userMessage)

            let response = null
            if (actionData.action == ACTIONS.QUERY) {
                let data = {
                    query: actionData.text,
                    conversation_id: conversationId || null,
                    twitter_data: twitterData,
                    twitter_request_type: twitterRequestType
                }

                let responseObj = await query(data)
                response = responseObj.response
                conversationId = responseObj.conversation_id
            }
            else {
                let data = {
                    action: actionData.action,
                    twitter_data: twitterData,
                    twitter_request_type: twitterRequestType,
                    // model_name: 'gpt-4o-mini'
                }
                response = await generateResponse(data)
            }

            addMessage(response)
        }
        catch (e) {
            addMessage("Oops! Something went wrong, please refresh and try again.")
            console.error(e)
        }
    }
}

function interpretUserMessage(message) {
    let actionObject = null

    const upperText = message.toUpperCase();
    // Check for each keyword
    for (const [keyword, action] of Object.entries(ACTION_KEYWORDS)) {
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

    // if user message does not match any action keywords, action is query
    actionObject = {
        action: ACTIONS.QUERY,
        text: message
    }

    return actionObject
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

function parseMarkdown(text) {
    return new marked.Marked()
        .use(markedFootnote())
        .parse(text)
}

// Convert existing messages to markdown
document.querySelectorAll('.bot-message').forEach(message => {
    message.innerHTML = parseMarkdown(message.textContent);
});

// Event Listeners
sendButton.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});

startChat()