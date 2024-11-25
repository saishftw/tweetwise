# TweetWise 🧠

AI-powered insights for Twitter threads, without the API costs.

TweetWise is a browser extension that provides AI-powered analysis of Twitter threads, including summaries, fact-checking, and sentiment analysis, all without requiring Twitter API access.

## Features ✨

- 📝 Thread summarization
- ✅ Fact checking
- 🎭 Sentiment analysis
- 💰 No Twitter API costs
- 🚀 Real-time processing

## Project Structure 🗂️

```
tweetwise/
├── browser_extension_client/    # Chrome extension source
└── twitter-ai-bot-api/         # FastAPI backend
```

## Setup Instructions 🛠️

### Backend Setup

The backend uses Poetry for dependency management and FastAPI for the API server.

1. Install Poetry if you haven't already:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Navigate to the API directory:
```bash
cd twitter-ai-bot-api
```

3. Install dependencies:
```bash
poetry install
```

4. Set up environment variables:
```bash
cp .env.example .env
```

5. Edit `.env` file with your API keys:
```env
OPENAI_API_KEY=your_key_here
# Add any other required API keys
```

6. Start the server:
```bash
poetry run uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Browser Extension Setup

1. Navigate to the extension directory

2. Load the extension in Chrome/Chromium:
   - Open Chrome/Chromium browser
   - Go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `browser_extension_client` folder in the directory

## Usage 📱

1. Install the extension
2. Navigate to Twitter/X.com
3. Open any tweet thread
4. Click the TweetWise extension icon to open the side panel
5. Use commands:
   - `/summary` - Get thread summary
   - `/fact-check` - Verify claims
   - `/sentiment-check` - Analyze sentiment

## Development 👩‍💻

### Backend Development

```bash
cd twitter-ai-bot-api
poetry init
uvicorn main:app --reload --port 8000
```

## API Endpoints 🔌

- `POST /api/ai/generate` - Generate thread summary, fact checking, sentiment based on the API request

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Built for 100x Engineers buildathon
- Uses Langchain for AI processing
- Extension built with Chromium Extension APIs