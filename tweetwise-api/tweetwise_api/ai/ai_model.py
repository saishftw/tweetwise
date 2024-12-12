from langchain_openai import ChatOpenAI
from langchain_xai import ChatXAI

# from langchain_google_vertexai import ChatVertexAI
from langchain_google_vertexai.model_garden import ChatAnthropicVertex

from .models import ModelProvider


def get_model(model_name: str, provider: ModelProvider):
    match provider:
        case ModelProvider.OPENAI:
            return ChatOpenAI(
                model=model_name,
                # temperature=0.4,
                verbose=True,
            )
        # case ModelProvider.GEMINI:
        #     return ChatVertexAI(
        #         model_name=model_name,
        #         temperature=0.4,
        #     )
        case ModelProvider.CLAUDE:
            return ChatAnthropicVertex(
                model="claude-3-5-sonnet@20240620",
                project="sidekick-421007",
                location="us-east5",
                # temperature=0.4,
            )
        case ModelProvider.XAI:
            return ChatXAI(
                # xai_api_key="YOUR_API_KEY",
                model=model_name,
                temperature=0.4,
                verbose=True,
            )
        case _:
            raise ValueError(f"No model provider found for {provider}")
