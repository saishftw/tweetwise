from fastapi import APIRouter, HTTPException, status
from .models import GenerateRequest, QueryRequest
from .service import generate_response, query
from tweetwise_api.conversation.service import ConversationService

router = APIRouter()


@router.post("/generate")
def generate(req: GenerateRequest):
    try:
        response = generate_response(req)

        return response

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=[{"error": e}],
        )  # TODO: Handle exceptions correctly


@router.post("/query")
def query_req(req: QueryRequest):
    try:
        conversation_id = req.conversation_id
        if (
            conversation_id is None
            or ConversationService.get_conversation(conversation_id) is None
        ):
            conversation_id = ConversationService.create_conversation()
            req.conversation_id = conversation_id

        response = query(req)

        return {"response": response, "conversation_id": conversation_id}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=[{"error": e}],
        )  # TODO: Handle exceptions correctly
