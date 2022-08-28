from time import sleep
from flask import Flask, jsonify, request

from flask_cors import cross_origin

from summarizer import summerize_content

from youtube_transcripter import youtube_transcriptor


app = Flask(__name__)


@app.route("/api/youtube-summary/", methods=['POST'])
@cross_origin()
def youtube_summary():

    if request.method == "POST":
        video_id = request.json.get('video_id', None)
        summary_ratio = request.json.get('ratio', None)

        if summary_ratio and summary_ratio.isdigit():
            summary_ratio = float(int(summary_ratio)/100)

        if not video_id:
            return jsonify({
                "code": "NO_VIDEO_ID",
                "description": "Video Id not provided"
            }), 400

        transcript = youtube_transcriptor(video_id)

        if transcript is None:
            return jsonify({
                "code": "TRANSCRIPT_DISABLED",
                "description": "Given video does not have transcripts or it has disabled transcripts"
            }), 400

        sentences = [x['text'] for x in transcript]
        sentences = ' \n '.join(sentences)

        summary = summerize_content(sentences, ratio=summary_ratio)

        return jsonify({
            'transcript': sentences,
            'transcript_word_count': len(sentences.split()),
            'summarized_text': summary,
            'summarized_word_count': len(summary.split()),
        }), 200


# Global Error Handling
@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "code": "METHOD_NOT_ALLOWED",
        "description": f"{request.method} is not allowed"
    }), 405


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "code": "INTERNAL_SERVER_ERROR",
        "description": f"Server facing some issues 😢"
    }), 500


if __name__ == "__main__":
    app.run(debug=True)
