function findAndScrollToText(searchText) {
    const tweetNodes = document.querySelectorAll('[data-testid="tweetText"] > span')
    const formattedSearchText = searchText.trim().toLowerCase()
    let textContents = []
    for (const node of tweetNodes) {
        textContents.push(node.textContent)
    }
    console.log(textContents)

    function findNode() {
        for (const node of tweetNodes) {
            const formattedNodeText = node.textContent.trim().toLowerCase()
            if (formattedNodeText &&
                // !urlRegex.test(nodeTextTrimmed) && // Skip link/URL-like text
                // formattedNodeText.length > 3 && // Minimum meaningful length
                (formattedSearchText.includes(formattedNodeText) ||
                    formattedNodeText.includes(formattedSearchText))) {
                return node;
            }
        }
    }

    const textNode = findNode();

    if (textNode) {
        // Find the closest parent element to scroll to
        const elementToScroll = textNode.nodeType === Node.TEXT_NODE
            ? textNode.parentElement
            : textNode;

        // Scroll to the element
        elementToScroll.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'center',    // Align to center of viewport
            inline: 'nearest'   // Minimal horizontal scrolling
        });

        // Optional: Highlight the text
        const range = document.createRange();
        range.selectNodeContents(textNode);

        // Remove previous highlights
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });

        // Create a highlight span
        const span = document.createElement('span');
        span.classList.add('search-highlight');
        span.style.transition = 'background-color 0.9s ease';
        span.style.backgroundColor = '#8e6c01';

        setTimeout(() => {
            span.style.backgroundColor = 'transparent'
        }, 1500);

        // span.style.fontWeight = 'bold';

        // Surround the text node with the highlight span
        range.surroundContents(span);

        return true;
    }

    // Text not found
    console.warn(`No matching text found for search.`);
    return false;
}