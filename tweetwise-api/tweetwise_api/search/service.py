from langchain_community.tools import DuckDuckGoSearchResults

search = DuckDuckGoSearchResults(backend="news", output_format="list")


def get_search_results(query: str):
    results = search.invoke(query)

    return results


get_search_results("Optimus robot can walk on uneven ground using AI technology")