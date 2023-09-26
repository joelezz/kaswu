class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];

        this.toggleState(this.args.chatBox);

    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hide the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
    
        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
    
        // Lisää automaattinen viesti botilta alkuun
        let msg2 = {
            name: "Bot",
            message: "Hei, olen Maria OpenAI:n ChatGPT:n voimauttama apuri. Autan sinua saavuttamaan tavoitteesi tällä voit aloittaa esimerkiksi täyttämällä: \'<a href=\"{google_forms}\">Tavoitelomake</a>\' tai voidaan jutella vielä lisää, mutta voit kysyä minulta aina lomakkeesta, niin lähetän sen sinulle. Voit tutustua myös <a href=\"https://openai.com/policies/privacy-policy\">OpenAI:n Tietosuojalomakkeeseen</a>"
        };
        this.messages.unshift(msg2);
    
        fetch('https://kaswu-botti.azurewebsites.net/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg3 = { name: "Bot", message: r.message };
                this.messages.push(msg3);
    
                this.updateChatText(chatbox)
                textField.value = ''
    
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }
<<<<<<< HEAD

    // Function to display the bot is typing message
    displayBotTyping(chatbox) {
        const botTypingMessage = '<div class="typing-animation">...</div>';
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML += botTypingMessage;
    }

    // Function to remove the bot is typing message
    removeBotTyping(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        const botTypingElement = chatmessage.querySelector('.typing-animation');
        if (botTypingElement) {
            chatmessage.removeChild(botTypingElement);
        }
    }

    displayWelcomeMessage(chatbox) {
        // Lisää tervetuloviesti
        let welcomeMessage = {
            name: "Bot",
            message: "Hei, olen täällä auttamassa sinua saavuttamaan tavoitteesi niin työssä kuin vapaa-ajalla. Anna minulle tavoitteesi, ja ohjaan sinua kohti niiden saavuttamista muutamilla yhteydenotoilla ja henkilökohtaisella tuellani. Voit tutustua myös tietosuojaan <a href=\"https://openai.com/policies/privacy-policy\">OpenAI:n Tietosuojalomake</a>"
        };

        this.messages.push(welcomeMessage);
        this.updateChatText(chatbox);
    }
=======
    
>>>>>>> 6f192df9101b26322a3efbd67bac843291b20efd

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, _index) {
            if (item.name === "Bot")
            {   
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
