from .models import GenerateRequest, GenerateActionNames, ModelProvider, QueryRequest
from .ai_model import get_model
from .prompts import (
    THREAD_SUMMARY_PROMPT,
    WALL_QUERY_SYSTEM_PROMPT,
    WALL_QUERY_USER_PROMPT,
    WALL_SUMMARY_PROMPT,
    FACTCHECK_PROMPT,
    SENTIMENTCHECK_PROMPT,
    THREAD_QUERY_SYSTEM_PROMPT,
    THREAD_QUERY_USER_PROMPT,
    FACTCHECK_SUMMARY_PROMPT,
)
from tweetwise_api.tweet.enums import TwitterRequestType
from tweetwise_api.search.service import get_search_results
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    HumanMessagePromptTemplate,
)
from tweetwise_api.conversation.service import ConversationService
from langchain_core.messages import SystemMessage
from langchain.callbacks.tracers import ConsoleCallbackHandler
from langchain.globals import set_debug

set_debug(True)


def get_prompt(action: GenerateActionNames, twitterRequestType: TwitterRequestType):
    match action:
        case GenerateActionNames.SUMMARY:
            if twitterRequestType == TwitterRequestType.THREAD:
                return THREAD_SUMMARY_PROMPT
            elif twitterRequestType == TwitterRequestType.WALL:
                return WALL_SUMMARY_PROMPT
        case GenerateActionNames.SENTIMENTCHECK:
            return SENTIMENTCHECK_PROMPT
        case GenerateActionNames.FACTCHECK:
            return FACTCHECK_PROMPT


def generate_response(req: GenerateRequest):
    model = get_model(model_name=req.model_name, provider=ModelProvider.OPENAI)

    prompt = ChatPromptTemplate.from_template(
        get_prompt(req.action, req.twitter_request_type)
    )

    chain = prompt | model | StrOutputParser()

    response = ""
    if req.action == GenerateActionNames.FACTCHECK:

        summary_prompt = ChatPromptTemplate.from_template(FACTCHECK_SUMMARY_PROMPT)
        summary_chain = summary_prompt | model | StrOutputParser()
        search_query = summary_chain.invoke({"tweet_json": req.twitter_data})
        search_results = get_search_results(search_query)

        response = chain.invoke({"tweet_json": req.twitter_data, "news_json": search_results})
    else:
        response = chain.invoke({"tweet_json": req.twitter_data})

    return response


def query(req: QueryRequest):
    model = get_model(model_name=req.model_name, provider=ModelProvider.OPENAI)

    prompt = None
    if req.twitter_request_type == TwitterRequestType.THREAD:
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(THREAD_QUERY_SYSTEM_PROMPT),
                MessagesPlaceholder("history"),
                HumanMessagePromptTemplate.from_template(THREAD_QUERY_USER_PROMPT),
            ]
        )
    elif req.twitter_request_type == TwitterRequestType.WALL:
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(WALL_QUERY_SYSTEM_PROMPT),
                MessagesPlaceholder("history"),
                HumanMessagePromptTemplate.from_template(WALL_QUERY_USER_PROMPT),
            ]
        )

    messages = ConversationService.get_messages(req.conversation_id)

    chain = prompt | model | StrOutputParser()
    response = chain.invoke(
        {"query": req.query, "history": messages, "tweet_json": req.twitter_data},
        config={"callbacks": [ConsoleCallbackHandler()]},
    )

    ConversationService.add_user_message(
        message=req.query, conversation_id=req.conversation_id
    )

    ConversationService.add_ai_message(
        message=response, conversation_id=req.conversation_id
    )

    return response
