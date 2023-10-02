class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
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

        // show or hides the box
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
    
        // Luo viesti-elementti
        const messageElement = document.createElement('div');
        messageElement.classList.add('generated-message');
        messageElement.textContent = text1;
    
        // Lisää viesti DOM:iin
        chatbox.appendChild(messageElement);
    
        // Aktivoi animaatio chatbotin vastaukselle
        messageElement.classList.add('animate');
    
        // Aseta viesti näkyväksi ja piilota input-kenttä
        messageElement.style.display = 'block';
        textField.style.display = 'none';
    
        // Tee Fetch-pyyntö chatbotille
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Maria", message: r.message };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
    
            // Tässä voit lisätä chatbotin vastauksen näyttämisen käyttöliittymässä
            const botResponseElement = document.createElement('div');
            botResponseElement.classList.add('messages__item', 'messages__item--operator');
            botResponseElement.textContent = r.message;
            chatbox.appendChild(botResponseElement);
        })
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }
    
    

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, _index) {
            if (item.name === "Maria")
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