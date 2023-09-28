class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
        this.messagesGenerated = false; // Initialize messagesGenerated here
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hide the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    addTypingAnimation(chatbox) {
        const messageContainer = chatbox.querySelector('.chatbox__messages');
    
        const animationSnippet = document.createElement('div');
        animationSnippet.classList.add('snippet');
        animationSnippet.classList.add('dot-flashing'); // Use your created animation class
        animationSnippet.setAttribute('data-title', 'Bot is typing...');
    
        // Create a wrapper for the typing animation
        const typingAnimationContainer = document.createElement('div');
        typingAnimationContainer.classList.add('typing-animation-container');
        typingAnimationContainer.appendChild(animationSnippet);
    
        messageContainer.appendChild(typingAnimationContainer);
    
        // Scroll to the bottom to keep the typing animation in view
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    

    removeTypingAnimation(chatbox) {
        const messageContainer = chatbox.querySelector('.chatbox__messages');
        const typingAnimation = messageContainer.querySelector('.dot-flashing');
    
        if (typingAnimation && typingAnimation.parentNode === messageContainer) {
            messageContainer.removeChild(typingAnimation);
        }
    }
    

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }
    
        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
    
        // Update the flag when a message is sent
        this.messagesGenerated = true;
    
        // Add animation before the Fetch request
        this.addTypingAnimation(chatbox);
    
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
                this.removeTypingAnimation(chatbox); // Remove animation after response
                this.updateChatText(chatbox);
                textField.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.removeTypingAnimation(chatbox); // Remove animation on error
                this.updateChatText(chatbox);
                textField.value = '';
            });
    }
    

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, _index) {
            if (item.name === "Maria") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
