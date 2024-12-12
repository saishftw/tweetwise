from pydantic import BaseModel, Field
from typing import Optional, List


class TwitterUser(BaseModel):
    user_id: Optional[str] = Field(None, description="The unique ID of the user.")
    name: str = Field("Unknown", description="The name of the user.")
    screen_name: str = Field(
        "Unknown", description="The screen name (handle) of the user."
    )
    profile_image_url: Optional[str] = Field(
        None, description="The URL of the user's profile image."
    )


class Tweet(BaseModel):
    tweet_id: Optional[str] = Field(None, description="The unique ID of the tweet.")
    text: str = Field(None, description="The full text of the tweet.")
    likes: int = Field(0, description="The number of likes the tweet has received.")
    user: TwitterUser = Field(..., description="The user who authored the tweet.")


class TwitterThread(BaseModel):
    original_tweet: Tweet = Field(
        ..., description="The original tweet that starts the thread."
    )
    replies: List[Tweet] = Field(
        default_factory=list, description="The replies to the original tweet."
    )

class TwitterWall(BaseModel):
    tweets: List[Tweet]
