from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
google_forms = os.getenv("GOOGLE_FORMS")
openai.api_key = os.environ.get("OPENAI_API_KEY")

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
            f"\'<a href=\"{google_forms}\">Tavoitelomake</a>\'"
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

    if google_forms in reply:
        reply = reply.replace("linkki", f'<a href="{google_forms}">Tavoitelomake</a>')
    return jsonify({"message": reply})
       
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
    #app.run(host="127.0.0.1", port=5000)

