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
        return null
    }
}

// Helper function to extract tweet details with error handling and optional chaining
function extractTweet(tweet) {
    try {
        const legacy = tweet?.legacy;
        if (!legacy) throw new Error('Tweet legacy data is missing');
        const user = extractUser(tweet?.core?.user_results?.result);
        return {
            tweet_id: tweet?.rest_id || null,
            text: legacy.full_text || 'No text available',
            user: user,
            likes: legacy.favorite_count || 0,
            views: tweet.result?.views?.count || 0,
            created_at: legacy.created_at,
            bookmark_count: legacy.bookmark_count || 0,
            retweet_count: legacy.bookmark_count || 0,
            reply_count: legacy.bookmark_count || 0,
            possibly_sensitive: legacy.possibly_sensitive
        };
    } catch (error) {
        console.error("Error extracting tweet:", error);
        return null
    }
}


function parseTwitterThread(data) {
    if (data)
        try {
            const instructions = data?.threaded_conversation_with_injections_v2?.instructions;
            if (!instructions || instructions.length === 0) throw new Error('No conversation instructions available');

            const entried = instructions[0]?.entries
            let originalTweet = null
            let replies = []

            entried.map(tweet => {
                if (tweet?.entryId && tweet.entryId.startsWith("tweet-")) {
                    originalTweet = extractTweet(tweet.content?.itemContent?.tweet_results?.result)
                }
                else if (tweet?.entryId && tweet.entryId.startsWith("conversationthread-")) {
                    reply = extractTweet(tweet.content?.items?.[0]?.item?.itemContent?.tweet_results?.result)
                    reply && replies.push(reply)
                }
            })

            return {
                original_tweet: originalTweet,
                replies: replies,
            };
        } catch (error) {
            console.error("Error parsing thread:", error);
            return null
        }
}

function parseTwitterWall(data) {
    if (data)
        try {
            const instructions = data?.home?.home_timeline_urt?.instructions;
            if (!instructions || instructions.length === 0) throw new Error('No twitter instructions available');

            const entries = instructions[0]?.entries
            let tweets = []

            entries.map(tweet => {
                if (tweet?.entryId && tweet.entryId.startsWith("tweet-")) {
                    let parsedTweet = extractTweet(tweet.content?.itemContent?.tweet_results?.result)
                    tweets.push(parsedTweet)
                }
                // else if (tweet?.entryId && tweet.entryId.startsWith("conversationthread")) {
                //     reply = extractTweet(tweet.content?.items?.[0]?.item?.itemContent?.tweet_results?.result)
                //     reply && replies.push(reply)
                // }
            })

            return { "tweets": tweets }
        } catch (error) {
            console.error("Error parsing thread:", error);
            return null
        }
}
