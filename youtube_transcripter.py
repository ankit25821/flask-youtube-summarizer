from youtube_transcript_api import (
    YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
)


def youtube_transcriptor(video_id):
    transcript = ''
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except (TranscriptsDisabled, NoTranscriptFound):
        return None
    return transcript
