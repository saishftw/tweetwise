from .models import GenerateResponseReq, GenerateActionNames, ModelProvider
from .ai_model import get_model
from .prompts import SUMMARY_PROMPT, FACTCHECK_PROMPT, SENTIMENTCHECK_PROMPT
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


def get_prompt(action: GenerateActionNames):
    match action:
        case GenerateActionNames.SUMMARY:
            return SUMMARY_PROMPT
        case GenerateActionNames.SENTIMENTCHECK:
            return SENTIMENTCHECK_PROMPT
        case GenerateActionNames.FACTCHECK:
            return FACTCHECK_PROMPT


def generate_response(req: GenerateResponseReq):
    model = get_model(model_name="gpt-4o-mini", provider=ModelProvider.OPENAI)

    prompt = ChatPromptTemplate.from_template(get_prompt(req.action))

    chain = prompt | model | StrOutputParser()

    response = chain.invoke({"tweet_json": req.twitter_thread})

    return response
