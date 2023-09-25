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

        // Display the bot is typing message
        this.displayBotTyping(chatbox);

        fetch('https://kaswu-botti.azurewebsites.net/predict', 'http://127.0.0.1:8000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Bot", message: r.message };
            this.messages.push(msg2);

            // Remove the bot is typing message
            this.removeBotTyping(chatbox);

            // Update the chatbox with the bot's reply
            this.updateChatText(chatbox);
            textField.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);

            // Remove the bot is typing message
            this.removeBotTyping(chatbox);

            // Update the chatbox with an error message
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }

    // Function to display the bot is typing message
    displayBotTyping(chatbox) {
        const botTypingMessage = '<div class="messages__item messages__item--bot-typing">Bot is typing...</div>';
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML += botTypingMessage;
    }

    // Function to remove the bot is typing message
    removeBotTyping(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        const botTypingElement = chatmessage.querySelector('.messages__item--bot-typing');
        if (botTypingElement) {
            chatmessage.removeChild(botTypingElement);
        }
    }

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
