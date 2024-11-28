// Helper function to extract user details with error handling and optional chaining
function extractUser(userData) {
    try {
        const legacy = userData?.legacy;
        if (!legacy) throw new Error('User legacy data is missing');
        return {
            user_id: userData?.rest_id || null,
            name: legacy?.name || 'Unknown',
            screen_name: legacy?.screen_name || 'Unknown',
            profile_image_url: legacy?.profile_image_url_https || null,
        };
    } catch (error) {
        console.error("Error extracting user:", error);
        return {
            user_id: null,
            name: 'Unknown',
            screen_name: 'Unknown',
            profile_image_url: null,
        };
    }
}

// Helper function to extract tweet details with error handling and optional chaining
function extractTweet(tweetData) {
    try {
        const legacy = tweetData?.legacy;
        if (!legacy) throw new Error('Tweet legacy data is missing');
        const user = extractUser(tweetData?.core?.user_results?.result);
        return {
            tweet_id: tweetData?.rest_id || null,
            text: legacy?.full_text || 'No text available',
            likes: legacy?.favorite_count || 0,
            user: user,
        };
    } catch (error) {
        console.error("Error extracting tweet:", error);
        return {
            tweet_id: null,
            text: 'Error retrieving tweet',
            likes: 0,
            user: extractUser({}), // Default user in case of error
        };
    }
}

// Main function to parse the JSON data and extract the thread with error handling and optional chaining
function parseTweet(data) {
    if (data)
        try {
            const instructions = data?.threaded_conversation_with_injections_v2?.instructions;
            if (!instructions || instructions.length === 0) throw new Error('No conversation instructions available');

            // Extract the original tweet (the first item in the conversation)
            // mainEntry can be a tweet or part of a conversationThread
            const mainEntry = instructions[0]?.entries[0]?.content?.itemContent?.tweet_results?.result ?? instructions[0]?.entries[0]?.content?.items?.[0]?.item?.itemContent?.tweet_results?.result;
            if (!mainEntry) throw new Error('Main tweet data is missing');
            const originalTweet = extractTweet(mainEntry);

            // Extract replies (the next items in the conversation)
            const replyEntries = instructions[0]?.entries?.slice(1, 3) || [];
            const replies = replyEntries.map(entry => extractTweet(entry?.content?.items?.[0]?.item?.itemContent?.tweet_results?.result));

            return {
                original_tweet: originalTweet,
                replies: replies,
            };
        } catch (error) {
            console.error("Error parsing thread:", error);
            return {
                original_tweet: {
                    tweet_id: null,
                    text: 'Error retrieving original tweet',
                    likes: 0,
                    user: {
                        user_id: null,
                        name: 'Unknown',
                        screen_name: 'Unknown',
                        profile_image_url: null,
                    },
                },
                replies: [],
            };
        }
}

// window.parseTweet = parseTweet

// const parsedData = parseTweet(sampleTweetJsonData);
// console.log(JSON.stringify(parsedData, null, 4)); // Display formatted output
