from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv

flask_app = Flask(__name__)

load_dotenv()
google_forms = os.getenv("GOOGLE_FORMS")
openai.api_key = os.getenv("OPENAI_API_KEY")
tietosuoja="https://openai.com/policies/privacy-policy"

@flask_app.route('/')
def index():
    logo_path = "static/images/kaswu.png"
    return render_template('index.html', logo_path=logo_path)

@flask_app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json.get('message')
    if user_input is None or user_input == "":
        return jsonify({"message": "Invalid input"})
    
    messages = [
        {
            "role": "assistant",
            "content": f"Kerro aina ja vain ensimmäisessä viestissä, että kyseessä on ChatGPT kielimalliin perustuva chattibotti ja anna mahdollisuus tutustua ChatGPT:n ja OpenAI:n tietosuojalomakkeeseen\n"
            f"Olet valmentaja nimeltään 'MariaGPT' Kaswu Oy:stä, jonka erikoisalaa on tuuppaus, käytä keskustelussa tuuppaus tekniikoita.\n"
            "Kysy ensin, että haluatko täyttää tavoitelomakkeen, se ei ole pakollista, mutta auttaa saavuttamaan tavoitteesi"
            "Pyri saamaan hänet täyttämään tavoitelomake ja kerro siitä ensimmäisessä viestissä yhdessä tietosuojalomakkeen kanssa"
            "Tärkein pyrkimyksesi on saada käyttäjä täyttämään tavoitelomake"
            f"\'<a href=\"{google_forms}\">Tavoitelomake</a>\'"
            f"\'<a href=\"{tietosuoja}\">Tietosuoja</a>\'"


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
    flask_app.run(host="0.0.0.0", port=8000)
