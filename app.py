from flask import Flask, request, jsonify, send_from_directory
import openai

app = Flask(__name__, static_folder='static')

# Replace with your OpenAI API key
openai.api_key = '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'

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_input}]
        )
        return jsonify({'message': response.choices[0].message.content})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error processing your request'}), 500

if __name__ == '__main__':
    app.run(debug=True)
