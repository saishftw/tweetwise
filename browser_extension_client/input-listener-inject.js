const KEYWORDS = {
    '@omnibot_x SUMMARIZE': 'SUMMARIZE',
    '@omnibot_x SENTIMENTCHECK': 'SENTIMENT',
    '@omnibot_x FACTCHECK': 'FACTCHECK'
};

let actionObject = null

function handleInput(event) {
    const target = event.target;

    // Only process if it's a contenteditable div or textarea
    if (!target.matches('[contenteditable="true"], textarea')) {
        return;
    }

    // Check if Enter was pressed
    if (event.key === 'Enter' && !event.shiftKey) {
        const text = target.value || target.textContent || '';

        // Convert to uppercase for case-insensitive comparison
        const upperText = text.toUpperCase();

        // Check for each keyword
        for (const [keyword, action] of Object.entries(KEYWORDS)) {
            const upperKeyword = keyword.toUpperCase();
            if (upperText.includes(upperKeyword)) {
                // Find the text after the keyword
                const startIndex = text.toLowerCase().indexOf(keyword.toLowerCase()) + keyword.length;
                const actionText = text.slice(startIndex).trim();

                // Create the action object
                actionObject = {
                    action: action,
                    text: actionText
                };

                // Log the action object
                console.log('Action triggered:', actionObject);

                // Send message to content script
                window.postMessage({
                    type: 'OMNIBOT_ACTION',
                    data: actionObject
                }, '*');

                // Prevent default Enter behavior if you want
                // event.preventDefault();
            }
        }
    }
}

// Add listeners for both keydown and input events
document.addEventListener('keydown', handleInput, true);

// For dynamic elements, we'll observe DOM changes
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            const inputs = document.querySelectorAll('[contenteditable="true"], textarea');
            inputs.forEach(input => {
                if (!input.dataset.omnibotListener) {
                    input.dataset.omnibotListener = 'true';
                    input.addEventListener('keydown', handleInput, true);
                }
            });
        }
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});


// function initReplyBtnListener() {
//     // Select the button using its data-testid attribute
//     const replyButton = document.querySelector('[data-testid="tweetButtonInline"]');

//     // Check if the button exists to avoid runtime errors
//     if (replyButton) {
//         // Add a click event listener to the button
//         replyButton.addEventListener('click', () => {
//             // Your action logic goes here
//             console.log('Reply button clicked!');

//             // Example action: Alert a message
//             alert('Reply action triggered!');
//         });
//     } else {
//         console.error('Button with data-testid="tweetButtonInline" not found.');
//     }
// }
// initReplyBtnListener()

console.log('OmniBot input listener installed');