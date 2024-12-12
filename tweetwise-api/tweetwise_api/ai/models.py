from typing import Any, Dict, Optional
from pydantic import BaseModel
from tweetwise_api.tweet.enums import TwitterRequestType
from .enums import GenerateActionNames, ModelProvider


class GenerateRequest(BaseModel):
    action: GenerateActionNames
    twitter_data: Dict[str, Any]
    twitter_request_type: TwitterRequestType
    model_name: Optional[str] = "gpt-4o-mini"
    model_provider: Optional[ModelProvider] = ModelProvider.OPENAI


class QueryRequest(BaseModel):
    query: str
    twitter_data: Dict[str, Any]
    twitter_request_type: TwitterRequestType
    conversation_id: Optional[str]
    model_name: Optional[str] = "gpt-4o-mini"
    model_provider: Optional[ModelProvider] = ModelProvider.OPENAI
