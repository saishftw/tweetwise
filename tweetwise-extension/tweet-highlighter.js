async function findAndScrollToText(searchText, options = {}) {
    // Default options
    const {
        maxDownwardScrolls = 2,    // Maximum number of downward scroll attempts
        maxUpwardScrolls = 2,      // Maximum number of upward scroll attempts
        scrollDelay = 1000,        // Delay between scrolls (ms)
        scrollAmount = 1000         // Pixels to scroll each time
    } = options;

    function getTweetNodes() {
        return document.querySelectorAll('[data-testid="tweetText"] > span')
    }

    function normalizeString(str) {
        return str
            .toLowerCase()                  // Convert to lowercase
            .replace(/[^a-z0-9]/gi, "")     // Remove non-alphanumeric characters
            .trim();                        // Trim leading/trailing spaces
    };

    // Function to scroll the page
    function scrollPage(direction) {
        window.scrollBy({
            top: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Function to wait for a specified duration
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Modified search function that handles virtualization
    async function searchWithScrolling() {
        // Reset any previous highlights
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });

        let normalizedSearchText = normalizeString(searchText)

        // First, try searching in current view
        let tweetNodes = getTweetNodes();

        function findNode(nodes) {
            for (const node of nodes) {
                const nodeText = node.textContent;
                // if (formattedNodeText &&
                //     (formattedSearchText.includes(formattedNodeText) ||
                //         formattedNodeText.includes(formattedSearchText))) {
                //     return node;
                // }
                let normalizedNodeText = normalizeString(nodeText)
                if (nodeText &&
                    normalizedNodeText.length > 3 &&
                    (normalizedNodeText.includes(normalizedSearchText) ||
                        normalizedSearchText.includes(normalizedNodeText)))
                    return node;
            }
            return null;
        }

        // Try to find the text in current view
        let textNode = findNode(tweetNodes);

        // If not found, try scrolling downward
        if (!textNode) {
            for (let i = 0; i < maxDownwardScrolls; i++) {
                // Scroll down
                scrollPage(2);

                // Wait for page to load
                await wait(scrollDelay);

                // Refresh tweet nodes
                tweetNodes = getTweetNodes();

                textNode = findNode(tweetNodes);

                if (textNode) break;
            }
        }

        // If still not found, try scrolling upward
        if (!textNode) {
            scrollPage(-3)
            for (let i = 0; i < maxUpwardScrolls; i++) {
                // Scroll up
                scrollPage(-2);

                // Wait for page to load
                await wait(scrollDelay);

                // Refresh tweet nodes
                tweetNodes = getTweetNodes();

                textNode = findNode(tweetNodes);

                if (textNode) break;
            }
        }

        // If text node found, scroll and highlight
        if (textNode) {
            // Find the closest parent element to scroll to
            const elementToScroll = textNode.nodeType === Node.TEXT_NODE
                ? textNode.parentElement
                : textNode;

            // Scroll to the element
            elementToScroll.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });

            // Create highlight
            const range = document.createRange();
            range.selectNodeContents(textNode);

            const span = document.createElement('span');
            span.classList.add('search-highlight');
            span.style.transition = 'background-color 0.9s ease';
            span.style.backgroundColor = '#8e6c01';

            setTimeout(() => {
                span.style.backgroundColor = 'transparent'
            }, 1500);

            // Surround the text node with the highlight span
            range.surroundContents(span);

            return true;
        }

        // Text not found after all attempts
        console.warn(`No matching text found for search: "${searchText}"`);
        return false;
    }

    // Return a promise to allow async usage
    return await searchWithScrolling();
}