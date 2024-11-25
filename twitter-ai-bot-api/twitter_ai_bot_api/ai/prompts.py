SUMMARY_PROMPT = """
The following is data representing a Twitter thread. The thread includes 
an original tweet and its replies, with relevant metadata such as text, 
user details, and likes. Please summarize the key information from this 
thread, focusing on the purpose or context of the original tweet and the 
interactions in the replies. Highlight the main topic discussed, the tone 
of the conversation, and any notable points or patterns. Use concise and clear language.

{tweet_json}

Requirements for the Summary:

Provide an overview of the main topic of the original tweet.
Summarize the nature of the replies, including their tone and content.
Identify if the replies contribute significantly to the discussion or are incidental.
Highlight any patterns or insights (e.g., engagement level or repeated phrases).
Output Format:

Main Topic: [Your summary of the main tweet]
Replies Overview: [Your summary of the replies]
Insights: [Any additional insights from the thread]

Answer in well-formatter Markdown format
"""

FACTCHECK_PROMPT = """
The following data represents a Twitter thread, including an original tweet and replies. Fact-check the information discussed within the tweets to determine whether it is accurate. Focus on the statements made by the original poster and in the replies. For each tweet:

Validate Information:

Identify any factual claims or statements within the tweet text.
Cross-check these claims with reliable sources.
Identify Misinformation:

Highlight any incorrect or misleading facts.
Provide a brief explanation of the correct information with references.
Tag the Poster:

For each incorrect fact, include the name, screen name, and user ID of the poster.
If all the information in the tweets is correct, confirm the accuracy of the content.

{tweet_json}

Output Format:

Original Tweet:

Claim: [The factual claim made in the original tweet]
Status: [Correct/Incorrect]
Details: [Explanation of why it is correct or incorrect, with references]
Replies:

Reply by [Name] (@ScreenName, User ID):
Claim: [The factual claim made in the reply]
Status: [Correct/Incorrect]
Details: [Explanation of why it is correct or incorrect, with references]
Summary:

[Overall assessment of the factual accuracy in the thread]

Answer in well-formatter Markdown format
"""

SENTIMENTCHECK_PROMPT = """
Analysis Goals:
Tweet-Level Sentiment Analysis:

For each tweet (original and replies), identify the overall sentiment (positive, negative, neutral, or mixed).
Highlight the key phrases or language used to determine the sentiment.
Provide a summary of the emotion conveyed (e.g., excitement, frustration, indifference).
Thread-Level Sentiment Trends:

Analyze the overall tone of the thread by combining the sentiments of all tweets.
Identify any shifts in sentiment between the original tweet and its replies.
Insights and Contextual Analysis:

Assess the alignment of the replies' sentiment with the original tweet's sentiment (e.g., supportive, critical, or indifferent).
Highlight any unusual sentiment patterns or notable interactions.

{tweet_json}

Output Format:

Original Tweet Sentiment:

Sentiment: [Positive/Negative/Neutral/Mixed]
Emotion: [Emotion detected, e.g., excitement, skepticism]
Key Phrases: [List of phrases influencing sentiment analysis]
Explanation: [Reasoning for the sentiment classification]
Replies Sentiment:

Reply by [Name] (@ScreenName, User ID):
Sentiment: [Positive/Negative/Neutral/Mixed]
Emotion: [Emotion detected]
Key Phrases: [List of phrases influencing sentiment analysis]
Explanation: [Reasoning for the sentiment classification]
Thread Sentiment Overview:

Overall Sentiment: [Overall sentiment of the thread]
Tone Alignment: [Are replies aligned with the original tweet’s sentiment? If not, describe the divergence.]
Trends: [Key observations, such as shifts in tone or recurring sentiment patterns]
Insights: [Notable findings, e.g., level of engagement, tone variance]

Answer in well-formatter Markdown format
"""