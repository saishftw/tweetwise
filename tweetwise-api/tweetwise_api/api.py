from typing import Any, List, Optional
from fastapi import APIRouter, Depends, FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from tweetwise_api.ai.router import router as ai_router
from tweetwise_api.auth.service import get_api_key


# Load environment variables from .env file
load_dotenv()


class ErrorMessage(BaseModel):
    error: Any


class ErrorResponse(BaseModel):
    detail: Optional[List[ErrorMessage]]


api_router = APIRouter(
    # prefix=os.environ["API_PUBLIC_PATH"],
    default_response_class=JSONResponse,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        403: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)

api_router.include_router(ai_router, prefix="/ai", tags=["ai"])


api_public_path = ""
app = FastAPI(
    title="tweetwise-api",
    description="",
    root_path=f"{api_public_path}/api/v1",
    docs_url=f"{api_public_path}/swagger",
    openapi_url=f"{api_public_path}/docs/openapi.json",
    redoc_url=f"{api_public_path}/docs",
    dependencies=[Depends(get_api_key)]
)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)
