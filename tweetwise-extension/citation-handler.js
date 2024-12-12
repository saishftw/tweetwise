function setupCitationListeners() {
    const citationLinks = document.querySelectorAll('[id^="footnote-ref-"]');
    const footnotesSection = document.querySelector('.footnotes');

    if (footnotesSection) {
        footnotesSection.style.display = 'none';
    }

    citationLinks.forEach(link => {
        // Remove existing listeners first to prevent duplicates
        link.removeEventListener('click', handleCitationClick);
        link.addEventListener('click', handleCitationClick);
    });
}

// MutationObserver to automatically add listeners to new elements
function setupCitationObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                setupCitationListeners();
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Handle citation click
function handleCitationClick(event) {
    event.preventDefault();

    const citationId = event.currentTarget.getAttribute('href').slice(1);
    const citationElement = document.getElementById(citationId);

    if (citationElement) {
        // const tweetText = citationElement.textContent.split(' - ')[0].replace(/^"(.*)"$/, '$1');
        // Remove unnecessary characters and extract the relevant text
        const tweetText = citationElement.textContent.replace(/^\n|\n$/g, '').replace(/"/g, '').replace(/[^ -~]/g, '');
        // Replace escaped newline characters with actual newlines
        const formattedTweetText = tweetText.replace(/\\n/g, '\n');

        console.log('Citation clicked:', formattedTweetText);

        // pass to content-script
        chrome.storage.session.set({ "selectedCitation": formattedTweetText }).then(() => {
            console.log("Citation text was set in chrome session storage");
        });
    }
}

// Initialize once when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupCitationListeners();
    setupCitationObserver();
});