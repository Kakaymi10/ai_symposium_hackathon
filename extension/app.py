from flask import Flask, request, jsonify
import assemblyai as aai
from elevenlabs.client import ElevenLabs
from elevenlabs import stream
import ollama

app = Flask(__name__)

class AI_Assistant:
    def __init__(self):
        aai.settings.api_key = ""
        self.client = ElevenLabs(api_key="")
        self.transcriber = None
        self.full_transcript = [
            {"role": "system", "content": "You are a language model called Llama 3 created by Meta, answer the questions being asked in less than 300 characters. Do not bold or asterix anything because this will be passed to a text to speech service."},
        ]

    def generate_ai_response(self, content):
        self.full_transcript.append({"role": "user", "content": content})
        ollama_stream = ollama.chat(model="llama3", messages=self.full_transcript, stream=True)

        text_buffer = ""
        full_text = ""
        for chunk in ollama_stream:
            text_buffer += chunk['message']['content']
            if text_buffer.endswith('.'):
                audio_stream = self.client.generate(text=text_buffer, model="eleven_turbo_v2", stream=True)
                stream(audio_stream)
                full_text += text_buffer
                text_buffer = ""

        if text_buffer:
            audio_stream = self.client.generate(text=text_buffer, model="eleven_turbo_v2", stream=True)
            stream(audio_stream)
            full_text += text_buffer

        self.full_transcript.append({"role": "assistant", "content": full_text})

        return full_text

assistant = AI_Assistant()

@app.route('/process_text', methods=['POST'])
def process_text():
    content = request.json.get('content')
    response_text = assistant.generate_ai_response(content)
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(port=5000)
