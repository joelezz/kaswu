class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
        };
        this.state = false;
        this.messages = [];
        this.userMessageCount = 0; // Initialize user message count
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                this.onSendButton(chatBox);
            }
            const chatbox = this.args.chatBox; // Store chatbox element for event listener

            chatbox.addEventListener('click', event => {
                const target = event.target;
                if (target.classList.contains('response-button')) {
                    const response = target.getAttribute('data-response');
                    if (response === 'kylla') {
                        // Handle 'Kyllä' response
                        const responseMessage = "<div class='messages__item messages__item--user'>Kyllä</div>";
                        chatbox.querySelector('.chatbox__messages').innerHTML += responseMessage;
                        // You can trigger any relevant action here
                    } else if (response === 'ei') {
                        // Handle 'Ei' response
                        const responseMessage = "<div class='messages__item messages__item--user'>Ei</div>";
                        chatbox.querySelector('.chatbox__messages').innerHTML += responseMessage;
                        // You can trigger any relevant action here
                    }
                }
            });
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;
        chatbox.classList.toggle('chatbox--active', this.state);
    }

    onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const text = textField.value.trim();
        if (text === '') {
            return;
        }

        const userMsg = {
            name: 'User',
            message: text
        };
        this.messages.push(userMsg);

        const botTypingContainer = chatbox.querySelector(`.bot-typing-container`);
        const botTypingMessage = botTypingContainer.querySelector('.messages__item--bot-typing');

        if (botTypingMessage) {
            botTypingContainer.style.display = 'block';

            const chatmessage = chatbox.querySelector('.chatbox__messages');
            const messageElement = document.createElement('div');
            messageElement.innerHTML = botTypingMessage.outerHTML;
            chatmessage.appendChild(messageElement);
            chatmessage.scrollTop = chatmessage.scrollHeight;
        }

        fetch('/predict', {
            method: 'POST',
            body: JSON.stringify({
                message: text
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Server response was not successful');
            }
        })
        .then(data => {
            const botMsg = {
                name: 'Bot',
                message: data.message
            };
            this.messages.push(botMsg);
            this.updateChatText(chatbox);
            textField.value = '';
        
            if (botTypingMessage) {
                botTypingContainer.style.display = 'none'; // Hide typing animation
            }

        })
        .catch(error => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        
            if (botTypingMessage) {
                botTypingContainer.style.display = 'none'; // Hide typing animation
            }
        });
    }

    updateChatText(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = this.messages.map(item => `
            <div class="messages__item messages__item--${item.name.toLowerCase()} ${item.name.toLowerCase() === 'bot' ? 'messages__item--operator' : ''}">${item.message}</div>
        `).reverse().join('');
    }
    
}

const chatbox = new Chatbox();
chatbox.display();
