from gensim.summarization.summarizer import summarize


def summerize_content(text: str, **kwargs) -> str:

    if not kwargs.get('ratio', None):
        kwargs['ratio'] = 0.5

    kwargs['ratio'] = float(kwargs['ratio'])

    summary = summarize(text, **kwargs).replace('\n', '')

    return summary
