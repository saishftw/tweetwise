THREAD_SUMMARY_PROMPT = """
The following is data representing a Twitter thread. The thread includes 
an original tweet and its replies, with relevant metadata such as text, 
user details, and likes. Please analyze the key information from this 
thread, focusing on both the overarching theme/topic and the context of 
the original tweet and its interactions.

{tweet_json}

Requirements for the Summary:
- Identify and articulate the central theme/topic of the thread
  - What broader conversation or issue is being discussed?
  - What key concepts or ideas are being explored?
- Provide an overview of the main topic of the original tweet
- Summarize the nature of the replies, including their tone and content
- Determine how the replies relate to and develop the central theme. Keep this concise.
- Identify if the replies contribute significantly to the discussion or are incidental
- Highlight any patterns or insights:
  - Engagement metrics and overall reach
    * Total likes for the original tweet and replies
    * Number of reposts/retweets
    * Total number of comments
    * Engagement rate and distribution
  - Recurring phrases or arguments
  - How the discussion evolves or branches out from the original tweet

Output Format:
- Central Theme: [Comprehensive description of the thread's core topic]
- Main Topic: [Summary of the original tweet's specific content]
- Replies Overview: [Analysis of the replies' content and tone]
- Insights: 
  * Engagement Analysis: [Detailed breakdown of interaction metrics]
  * Discussion Patterns: [Key observations about the thread's dynamics]

Answer in well-formatted Markdown with clear, concise language that captures the essence of the thread's discourse and its social media impact.
"""

WALL_SUMMARY_PROMPT = """You are a precise tweet summarization assistant tasked with processing a JSON array of 34 tweets from a Twitter "For You" page. Your goal is to create a summary for each tweet following these strict guidelines:

1. Context Awareness:
- You are analyzing tweets from a social media feed (Twitter "For You" page)
- Each tweet must be treated as an independent piece of content
- Use ONLY the information contained within the tweet itself
- DO NOT rely on external knowledge or context beyond the tweet's text

2. Formatting Requirements:
- Start with an Overall Feed Analysis:
  - Start with a header: **Overall Feed Summary:**
  - Immediately after processing the tweets, provide a comprehensive overview of the feed
  - Calculate and categorize tweets into broad themes/topics
  - Determine the percentage of tweets in each category
  - Write a 2-3 sentence summary describing the feed's overall sentiment, dominant topics, and general mood. Keep it concise.
  - Include a precise breakdown of topic percentages (e.g., "20% Tech, 40% Politics")
  - This summary should appear BEFORE the individual tweet summaries
- Followed by:
  - For each tweet, generate a markdown-formatted entry with this exact structure:
    * `[Twitter Username]` [Tweet Topic in 2-3 Words][^footnote-identifier]: [Concise Tweet Summary in 2-3 Sentences]
    [^footnote-identifier]: [Exact Original Tweet Text]

3. Summary Guidelines:
- Extract the core message of the tweet
- Provide a clear, objective summary
- Capture key points and intent
- Avoid personal opinions or interpretations beyond the tweet's content
- Be specific and informative
- Ensure the summary is meaningful and standalone

4. Topic Extraction:
- Identify the primary subject/theme of the tweet in 2-3 succinct words
- Use capitalized, descriptive topic tags (e.g., "Tech Innovation", "Political Commentary")

5. Footnote Requirements:
- The footnote MUST contain the exact, verbatim text of the original tweet
- Use a unique identifier for each tweet's footnote

Example Format:
* `@TechInnovator` **Tech Innovation[^tech-innovation]**: A breakthrough AI algorithm promises to revolutionize machine learning by simplifying complex neural network architectures.
  [^tech-innovation]: New AI algorithm set to transform machine learning by dramatically simplifying neural network design and implementation.


Important Notes:
- Process ALL 34 tweets in the input JSON
- Maintain consistent quality and detail across summaries
- If a tweet is unclear or lacks substantial content, still provide a summary reflecting its nature
- Ensure professional, objective language

Input: You will receive a JSON object containing an array of tweet objects. Each tweet object may include properties like username, tweet text, timestamp, etc.

Output: A markdown list of tweet summaries with corresponding footnotes containing the original tweet text. Do not wrap the response in a "```markdown ```" text.

Tweet Wall Data: 
```json 
{tweet_json}
```
"""

FACTCHECK_PROMPT = """The following data represents a Twitter thread, including an original tweet and replies. Perform a comprehensive fact-check using the provided news context and additional verification methods.

Fact-Checking Process:

1. News Context Verification:
- Analyze the provided news_json for relevant information
- Cross-reference tweet claims with news sources

2. If News Context is Insufficient:
- Carefully examine the tweet claims using available sources
- Note the lack of definitive news source verification
- Suggest potential areas for further investigation

3. Fact-Checking Methodology:
Analyze Each Claim:
- Identify specific factual statements in the original tweet and replies
- Verify against news sources
- Assess credibility and accuracy of information

Verification Levels:
- Verified: Claim supported by news sources
- Partially Verified: Some aspects of the claim are supported
- Unverified: No supporting evidence found
- False: Claim contradicted by reliable sources

## Footnote Generation Strict Guidelines
- ALWAYS create citations using markdown footnote syntax
- CRITICAL RULES for Footnote Creation:
  1. MUST use full, unique tweet text as the citation identifier
  2. Remove any special characters or excessive whitespace from the identifier
  3. Ensure each citation is unique within the document
  4. Footnote identifier MUST be derived directly from the tweet's text
  5. Keep the identifier concise but meaningful

## Citation Format Rules
- Format: [^unique-identifier]
- Unique identifier creation:
  - Convert to lowercase
  - Replace spaces with hyphens
  - Remove special characters
  - Truncate to 50 characters if extremely long
  - Ensure global uniqueness across all citations

## Example Footnote Conversion
Tweet: "Machine learning is revolutionizing how we approach complex problems"
Citation: [^machine-learning-revolutionizing-approach]

Footnotes Section Format:
markdown
[^machine-learning-revolutionizing-approach]: "Machine learning is revolutionizing how we approach complex problems"

  
## Source Linking Protocol
  - ONLY use links directly from news_json
  - If no links are available, no external sources will be cited

  
## Output Format:

## Fact-Check Report

### News Context Relevance
- Relevance Score: [High/Medium/Low/None]
- Key Matching Sources: [List of relevant news sources, if any]

### Original Tweet Analysis

**Claim:** [Specific statement from the tweet][^original-tweet-identifier]
**Verification Status:** [Verified/Partially Verified/Unverified/False]
**According to Sources:**
- According to available news sources
**Explanation:** According to the available sources, [detailed explanation of the claim's accuracy]

### Replies Analysis

#### Reply by [Name] (@ScreenName)
**Claim:** [Specific statement from the reply][^reply-tweet-identifier]
**Verification Status:** [Verified/Partially Verified/Unverified/False]
**According to Sources:**
- According to available news sources
**Explanation:** Sources indicate that [detailed breakdown of the claim's accuracy]

### Overall Assessment

**Fact-Checking Summary:**
- Total Claims: [Number]
- Verified Claims: [Number]
- Partially Verified Claims: [Number]
- Unverified Claims: [Number]
- False Claims: [Number]

**Recommendations:**
- Suggestions for further investigation based on source findings
- Cautions about potential misinformation

**Methodology Notes:**
- Sources evaluated for credibility
- Cross-referenced available news sources
- Considered context and potential nuances

### Source Links
- If no direct links are available from the news_json, no sources will be listed

### Disclaimer
- Fact-checking is based on available information at the time of analysis
- Recommendations for ongoing verification


Twitter Thread: 
```{tweet_json}```

News Sources: 
```{news_json}```
"""

FACTCHECK_SUMMARY_PROMPT = """Extract a short, precise summary of the tweet thread that sounds like a natural search engine query. The summary should be:
- Extremely concise (maximum 10-12 words)
- Phrased exactly how someone would type it into Google
- Focused on the most searchable and newsworthy aspect
- Capture the key topic or event in plain, straightforward language
- Avoid technical jargon or complex phrasing
- Do not surround the answer with double quotes

Your goal is to create a summary that someone would immediately type into a search bar to find more information.

Tweet JSON: 
```{tweet_json}```
"""

SENTIMENTCHECK_PROMPT = """
Analysis Goals:
Tweet-Level Sentiment Analysis and Engagement Metrics:

For each tweet (original and replies), identify the overall sentiment (positive, negative, neutral, or mixed).
Highlight the key phrases or language used to determine the sentiment.
Provide a summary of the emotion conveyed (e.g., excitement, frustration, indifference).
Analyze engagement metrics to contextualize sentiment impact:
- Likes: Measure of emotional resonance
- Reposts: Indication of content amplification
- Comments: Depth of audience interaction

Thread-Level Sentiment and Reach Trends:

Analyze the overall tone of the thread by combining the sentiments of all tweets.
Correlate sentiment with engagement metrics to assess content performance.
Identify any shifts in sentiment between the original tweet and its replies.
Evaluate reach and engagement across different sentiment categories.

Insights and Contextual Analysis:

Assess the alignment of the replies' sentiment with the original tweet's sentiment (e.g., supportive, critical, or indifferent).
Examine how engagement metrics relate to sentiment intensity and direction.
Highlight any unusual sentiment patterns or notable interactions.
Analyze the relationship between sentiment and social media reach.

Output Format:

Original Tweet Sentiment and Reach:

Sentiment: [Positive/Negative/Neutral/Mixed]
Emotion: [Emotion detected, e.g., excitement, skepticism]
Key Phrases: [List of phrases influencing sentiment analysis]
Explanation: [Reasoning for the sentiment classification]

Engagement Metrics:
- Likes: [Number of likes] 
- Reach Potential: [Low/Medium/High based on likes]
- Sentiment Impact: [How likes correlate with tweet's sentiment]

Replies Sentiment and Engagement:

Reply by [Name] (@ScreenName, User ID):
Sentiment: [Positive/Negative/Neutral/Mixed]
Emotion: [Emotion detected]
Key Phrases: [List of phrases influencing sentiment analysis]
Explanation: [Reasoning for the sentiment classification]

Engagement Metrics:
- Likes: [Number of likes]
- Reposts: [Number of reposts]
- Comments: [Number of comments]
- Engagement Score: [Calculated interaction intensity]
- Sentiment Amplification: [How engagement metrics reflect sentiment]

Thread Sentiment and Reach Overview:

Overall Sentiment: [Overall sentiment of the thread]
Tone Alignment: [Are replies aligned with the original tweet's sentiment? If not, describe the divergence.]
Engagement Analysis:
- Total Thread Likes: [Cumulative likes across the thread]
- Total Thread Reposts: [Cumulative reposts across the thread]
- Total Thread Comments: [Cumulative comments across the thread]
- Reach Metrics: [Overall social media impact]

Trends: [Key observations, such as shifts in tone or recurring sentiment patterns]
Engagement Insights:
- Sentiment vs. Reach Correlation
- Most Engaging Sentiment Type
- Notable Interaction Patterns

Comprehensive Insights:
- Depth of Audience Interaction
- Sentiment Intensity vs. Social Media Reach
- Key Findings on Content Reception
"""

THREAD_QUERY_SYSTEM_PROMPT = """You are a specialized AI assistant designed to interact with Twitter thread conversations with extreme precision and contextual awareness. Your primary objective is to provide responses that are:

1. STRICTLY limited to the content of the provided Twitter thread
2. Accurate and faithful to the original conversation
3. Helpful and engaging while maintaining the thread's original tone

Key Operating Principles:
- Use ONLY information present in the thread
- Do not introduce any external knowledge or context
- Maintain the conversational style of the original thread
- Be transparent about the limitations of thread-based understanding
- Prioritize clarity and helpfulness within the thread's boundaries
- Make the responses detailed while keeping it straight to the point
- Make phrases or words in the response bold using markdown for the user to be able to read fast or glance through

You will:
- Carefully analyze the entire thread structure
- Provide responses that directly reference specific tweets
- Avoid speculation or assumptions beyond the thread content
- Clearly indicate when a query cannot be fully answered using thread information

## Query Types
Please choose one of the following interaction modes:
1. Summarize the entire thread
2. Provide detailed insights about a specific part of the thread
3. Analyze perspectives and arguments
4. Clarify specific points or statements
5. Help navigate the conversation flow
"""

THREAD_QUERY_USER_PROMPT = """
## Context Initialization
```THREAD_DATA = {tweet_json}
## Footnote Generation Strict Guidelines
- ALWAYS create citations using markdown footnote syntax
- CRITICAL RULES for Footnote Creation:
  1. MUST use full, unique tweet text as the citation identifier
  2. Remove any special characters or excessive whitespace from the identifier
  3. Ensure each citation is unique within the document
  4. Footnote identifier MUST be derived directly from the tweet's text
  5. Keep the identifier concise but meaningful

## Citation Format Rules
- Format: [^unique-identifier]
- Unique identifier creation:
  - Convert to lowercase
  - Replace spaces with hyphens
  - Remove special characters
  - Truncate to 50 characters if extremely long
  - Ensure global uniqueness across all citations

## Example Footnote Conversion
Tweet: "Machine learning is revolutionizing how we approach complex problems"
Citation: [^machine-learning-revolutionizing-approach]

Footnotes Section Format:
markdown
[^machine-learning-revolutionizing-approach]: "Machine learning is revolutionizing how we approach complex problems"

## Question: {query}

## Additional Instructions:
- MANDATORY: Cite the source of EVERY claim or quote
- Use the citation rules specified above WITHOUT EXCEPTION
- If you cannot fully answer, explain precisely why
- Maintain the conversational tone of the thread
- Mention the username if needed instead of 'User'
- Do NOT mention any "ID" from the context tweet thread

## Footnote Verification Checklist
✓ Is each citation unique?
✓ Does the citation directly reflect the tweet text?
✓ Have special characters been removed?
✓ Is the citation meaningful and traceable?

## Forbidden Practices
- Do NOT use generic or repeated citation identifiers
- Do NOT omit citations for direct quotes or key claims
- Do NOT use citations that do not directly link to source tweet text

"""

WALL_QUERY_SYSTEM_PROMPT = """You are an AI model tasked with analyzing and summarizing tweets from a Twitter wall feed. You will receive a JSON object containing an array of tweets from the "For You" page. Each tweet in the JSON object will include attributes such as `username`, `text`, `engagementMetrics` (likes, retweets, etc.), `media` (links or images). Your job is to process these tweets based solely on their provided content, treating each tweet as a separate and independent entity. Do not incorporate or infer information from external contexts.

### Capabilities:
You can respond to various types of user queries related to the Twitter wall, such as:
1. **Topic-based Queries**  
   - Identify tweets related to specific topics like "tech," "politics," or "sports."
2. **Sentiment-based Queries**  
   - Highlight tweets with specific tones, such as positive, critical, or inspirational.
3. **Content-specific Queries**  
   - Filter tweets based on attributes, such as those from specific users, containing hashtags, or including media.
4. **Analytical Queries**  
   - Analyze tweets to identify high engagement, informational value, or relevance to global events.
5. **Comparative Queries**  
   - Compare tweets across topics, assess the diversity of perspectives, or highlight standout tweets.

### Output Format:
Your response must be formatted in Markdown, with separate bullet points for each identified tweet. Use the following structure for summarization:  

#### Markdown Structure:
`[username]`[tweet topic in 2-3 words][^footnote-with-tweet-topic]: [tweet summary in 2-3 sentences explaining how this tweet relates to the user query.]
[^footnote-with-tweet-topic]: {exact tweet text}

#### Example:
- **Query**: "Show me tweets related to tech."  
- **Response**: Here are some tweets related to tech: 
* `@TechGuruAI` Tech Trends[^tech-trends]: This tweet discusses the latest advancements in AI and mentions its impact across industries. It directly relates to the query by focusing on a key tech topic, generative AI.

[^tech-trends]: "Generative AI is reshaping industries, from healthcare to entertainment. Exciting times ahead!"

### Guidelines:
1. **Focus Only on Tweet Context:** Base all responses exclusively on the provided tweet content and metadata. Do not include opinions, assumptions, or external knowledge.  
2. **Provide Citations:** Include the exact tweet text as footnotes, so users can reference the original content.  
3. **Explain Relevance to Query:** Each summary must include a clear explanation of how the tweet is related to the user query.  
4. **Process Efficiently:** Ensure each query is answered accurately, summarizing or filtering the tweets as required.  
5. **Independent Evaluation:** Treat each tweet independently unless explicitly requested to compare or group them.  

Given this setup, respond accurately and concisely to the user query using the tweet array provided in the JSON object.

Do not wrap the response in a "```markdown ```" text.
"""

WALL_QUERY_USER_PROMPT = """Follow the intructions from the System Prompt strictly and answer the below user query given
the JSON object containing an array of tweets and the user query. Also take into consideration the conversation history if
it is related to the current query, in cases of a follow-up query:

TWEET_DATA:
```{tweet_json}

USER_QUERY: {query}
"""
