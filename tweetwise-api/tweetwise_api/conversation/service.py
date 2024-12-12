import uuid
from langchain_community.chat_message_histories import ChatMessageHistory


class ConversationService:
    _conversations: dict[str, ChatMessageHistory] = {}

    @classmethod    
    def get_conversation(cls, conversation_id: str):
        if conversation_id in cls._conversations:
            return cls._conversations.get(conversation_id)
        else:
            return None
            # raise ValueError(f"No conversation found for id: {conversation_id}")

    @classmethod
    def create_conversation(cls) -> str:
        conversation_id = str(uuid.uuid4())
        conversation = ChatMessageHistory()
        cls._conversations[conversation_id] = conversation

        return conversation_id

    @classmethod
    def add_user_message(cls, message: str, conversation_id: str):
        if conversation_id not in cls._conversations:
            raise ValueError(f"No conversation found for id: {conversation_id}")
        
        cls._conversations.get(conversation_id).add_user_message(message)

    @classmethod
    def add_ai_message(cls, message: str, conversation_id: str):
        if conversation_id not in cls._conversations:
            raise ValueError(f"No conversation found for id: {conversation_id}")
        
        cls._conversations.get(conversation_id).add_ai_message(message)

    @classmethod
    def get_messages(cls, conversation_id: str):
        conversation = cls.get_conversation(conversation_id)
        return conversation.messages
