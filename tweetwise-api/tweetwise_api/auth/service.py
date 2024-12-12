from fastapi.security import APIKeyHeader
from fastapi import HTTPException, Security
from starlette.status import HTTP_403_FORBIDDEN

api_key_header = APIKeyHeader(name='X-API-Key', auto_error=False)


async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == 'FPX61ZlCBlBtjRPVEg9ryzMElDx3XquH':
        return api_key_header
    raise HTTPException(
        status_code=HTTP_403_FORBIDDEN, detail="Could not validate API Key"
    )
