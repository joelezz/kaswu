from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import logging

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}) # CORS allows requests from all origins during development


load_dotenv()
google_forms = os.getenv("GOOGLE_FORMS")
openai.api_key = os.environ.get("OPENAI_API_KEY")

google_forms_reply = "[Tavoitelomake](https://docs.google.com/forms/d/e/1FAIpQLSeWO15gmTC3-m7fYRA90C7l_2CUKKqXJxqJ3t_E_UHAIQjT4A/viewform?usp=pp_url)"
google_forms_link = f"<a href='{google_forms}'>Tavoitelomake</a>"

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
        {
            "role": "assistant",
            "content": f"Olet valmentaja nimeltään 'MariaGPT' Kaswu Oy:stä, jonka erikoisalaa on tuuppaus, käytä keskustelussa tuuppaus tekniikoita.\n"
                       "Käytä paljone emojeita ja kirjoita lyhyitä yhden tai kahden virkkeen vastauksia, kieliasusi on yksinkertaista, niin että tavallinen nuorikin ymmärtää"
                       "Tärkein pyrkimyksesi on saada käyttäjä täyttämään tavoitelomake"
                       f" <a href='{google_forms}'>Tavoitelomake</a>"
        },
        {
            "role": "user",
            "content": user_input
        }
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    reply = response.choices[0].message['content']
    reply = reply.replace(f"[Tavoitelomake]({google_forms})", google_forms_link)

    return jsonify({"message": reply})

       
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
    #app.run(host="127.0.0.1", port=5000)

