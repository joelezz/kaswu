class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = true;
        this.messages = [];
        this.messagesGenerated = false; // Initialize messagesGenerated here

        this.display(); // avaa chat ikkunan heti alkuun
    }

    display() {
        const { chatBox, sendButton } = this.args;

        // Remove the event listener for opening the chatbox as it's always open

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        // Send the initial two messages automatically
        this.sendInitialMessages(chatBox);

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

    sendInitialMessages(chatbox) {
        // Lähetä ensimmäinen viesti: Ohjeet käytöstä
        const instructionsMessage = { name: "Maria", message: "Tervetuloa Maria-GPT chatbotiin! Voit käyttää minua kirjoittamalla viestejä tähän ikkunaan. Olen täällä auttamassa sinua." };
        this.messages.push(instructionsMessage);
        this.updateChatText(chatbox);
        this.addTypingAnimation(chatbox)

        // Lähetä toinen viesti: Tietosuoja ja tavoitelomake
        setTimeout(() => {
            const privacyMessage = { name: "Maria", message: "Tietosuoja: Käytämme tietojasi vain keskustelun tarkoituksiin eikä niitä jaeta kolmansille osapuolille,  <a href=https://openai.com/policies/privacy-policy>OpenAI -tietosuojalomake.</a> Tavoitelomakkeen löydät täältä: <a href=\"{google_forms}\">Tavoitelomake</a>." };
            this.messages.push(privacyMessage);
            this.updateChatText(chatbox);
        }, 2000); // Odota 2 sekuntia ensimmäisen viestin jälkeen ja lähetä toinen viesti
    }

    addTypingAnimation(chatbox) {
        const messageContainer = chatbox.querySelector('.chatbox__messages');

        // Create a new message node for the typing animation
        const typingAnimationNode = document.createElement('div');
        typingAnimationNode.classList.add('messages__item');

        typingAnimationNode.classList.add('messages__item--typing');


        const animationSnippet = document.createElement('div');
        animationSnippet.classList.add('snippet');
        animationSnippet.classList.add('dot-flashing');
        animationSnippet.setAttribute('data-title', 'Bot is typing...');

        typingAnimationNode.appendChild(animationSnippet);

        messageContainer.appendChild(typingAnimationNode);

        // Scroll to the bottom to keep the new message in view
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

    
    fetch('https://mariagpt.azurewebsites.net/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
    },
})
        .then(r => {
            if (!r.ok) {
                console.error('Network response status:', r.status);
                throw new Error("Network error not ok");
            }
            return r.json(); // Read the response as text
        })
        .then(responseText => {
            console.log('Response Text:', responseText); // Log the response text
            // Now try parsing it as JSON
            return JSON.parse(responseText);
        })
        .then(responseData => {
            // Check if the responseData is valid JSON
            if (typeof responseData === 'object' && responseData !== null) {
                let msg2 = { name: "Maria", message: responseData.message };
                this.messages.push(msg2);
            } else {
                // Handle the case where responseData is not valid JSON
                console.error('Invalid JSON response:', responseData);
                // You can decide how to handle this case
            }
        
            this.removeTypingAnimation(chatbox);
            this.updateChatText(chatbox);
            textField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            this.removeTypingAnimation(chatbox); // Remove animation on error
            this.updateChatText(chatbox);
            textField.value = '';
        });

    }
    
    

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().forEach(function (item, _index) {
            if (item.name === "Maria") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.scrollTop = chatmessage.scrollHeight;
        chatmessage.innerHTML = html;

    }
}

const chatbox = new Chatbox();
