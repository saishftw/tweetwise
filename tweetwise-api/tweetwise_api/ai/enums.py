from enum import Enum


class GenerateActionNames(Enum):
    SUMMARY = "SUMMARY"
    FACTCHECK = "FACTCHECK"
    SENTIMENTCHECK = "SENTIMENT"


class ModelProvider(Enum):
    OPENAI = "openai"
    GROK = "grok"
    GEMINI = "gemini"
    CLAUDE = "claude"
