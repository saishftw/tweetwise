PLAN
- Set up Twitter Bot ✅
- Set up Twitter auth with eliza ❌
- Check browser plugin implementations and limitations ✅
- Check Twitter thread scraper ✅
    - can use a headless browser to intercept tweet thread response (server-side)  (cannot get comments unless you log in) ❌
    - browser extension ✅
        - side panel chat interface implementation ✅


FLOW: ✅
- User installs plugin ✅
- User browses to X.com, opens a tweet thread to get summary/fact-check/sentiment ✅
- User clicks on Extension; a side panel opens with chat interface ✅
- User types in keyword - /summary, /fact-check, /sentiment-check ✅

FLOW: ❌
- User sets up Twitter bot account using plugin
- Plugin listens to user key-strokes for @omnibotx SUMMARIZE/FACTCHECK/SENTIMENT ❌
- User types in @omnibotx {KEYWORD_OP} ❌
- Plugin is triggered if the {KEYWORD} matches and Enter key is pressed
- Plugin scrapes thread data in web-page (Need to check how)
- Plugin calls API with scraped data, operation (summary, fact-check, sentiment), twitter thread id 
- API comments on the Twitter thread using the thread_id (check if comments can be made from API using thread id)

ISSUES:
- data not passed correctly to side panel (check common storage options) ✅

ENHANCEMENTS:
- REFACTOR ✅
- Hosting: ⬆️⬆️
    - API on cloud run ✅
    - Extension on store (check publish) ⭕️ OR github download link ⭕️
- FE/BE: Stream response
- UI: more modern and sleek ✅
    - glow lines or paper-like (check dribbble) ; more like v0 ❌
- BE: Add chat ✅
- FE: Add popup for keywords on "/" to make it easier for end-user ✅
- FE: Add status messages:
    - Tweet loaded ⬆️
    - Bot (scanning, thinking, etc; like v0) ❌
- BE: Add support for interpreting images ❌
- FE/BE: Citations with text-highlight ✅
- BE: Add intents:
    - Impersonation ❌
    - Rewrite
    - Repost writing tool
    - Simplify ⬆️
    - Fact-checking with GSearch API and scrape ✅
        - Related references (news/articles) on the internet ✅
- FE: Response actions ❌
    - Copy ❌
    - Retry ❌
- FE/BE: Login: email sign-up OR twitter handle
- Demo chat use-cases:
    - Suggest learning resources based on content
- BE: Check if the entire user wall data can be scraped and summarized ✅
    - solves problem of browsing only the interesting parts of twitter and quickly jumping to a tweet if useful (TweetHop) ✅
    - feature to hop tweets that the user is interested in: 
        - "show me tweets related to tech": this will show tweets with summary as a list which the user can hop to OR open the tweet directly ✅
    - get summary topic wise to get an overall gist of what's trending ✅
- FE: Check API call pagination and how lazy-loaded data can also be considered for: ✅
    - twitter thread ✅
    - wall ✅
    - trending topic

- add reposts and shares as a factor of reach in sentiment ✅
- refine prompts for sentimet and fact-check to take into consideration real-time web data ✅ 
- memories: ⬆️
    - storing user data locally for user profiling: use this data to make a user-profile
    - use this data for analytics
    - data captured
        - twitter wall
        - tweets clicked
        - topics browsed
    - store locally as cookies
- Refine bot messages according to new features ✅
- Build product landing page ✅
    - Download extension ✅
    - Mention coming soon on Chrome web store ✅
    - Instructions on how to install extension ✅
    - Video on how to use extension with features ❌ 