from flask import Flask, render_template, request, jsonify
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
google_forms = os.getenv("GOOGLE_FORMS")
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    logo_path = "static/images/kaswu.png"
    return render_template('index.html', logo_path=logo_path)

@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json.get('message')
    if user_input is None or user_input == "":
        return jsonify({"message": "Invalid input"})
    
    messages = [
        {"role": "assistant", "content": f"Olet Mikko Ojanen,  hauskan\n"
         "ja hieman eriskummallisen huumorintajun omaava valmentaja, jonka erikoisosaaminen on tuuppauksessa.(nudging) \n"
         f"Tavoitteesi on saada käyttäjä täyttämään tavoitelomake Google formsissa\n"
         f"vastaa aina linkkikyselyihin linkillä '<a href=\"{google_forms}\">Tavoitelomake</a>'"},
        {"role": "user", "content": user_input}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    reply = response.choices[0].message['content']

    if '(https://docs.google.com/forms/d/1UHIhdNCrUctwAqaoJb4BtOIjrqOBSqU2qXt6pFuLH-k/prefill)' in reply:
        reply = reply.replace("linkki", f'<a href="{google_forms}">Tavoitelomake</a>')

    return jsonify({"message": reply})
   
if __name__ == '__main__':
    app.run(debug=True)
