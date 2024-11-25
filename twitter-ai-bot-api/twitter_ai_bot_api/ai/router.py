from fastapi import APIRouter, HTTPException, status
from .models import GenerateResponseReq
from .service import generate_response

router = APIRouter()


@router.post("/generate")
def generate(req: GenerateResponseReq):
    try:
        response = generate_response(req)

        return response

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=[{"error": e}],
        )  # TODO: Handle exceptions correctly
