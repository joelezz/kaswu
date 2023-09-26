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
    
        let msg = { name: "User", message: text1 }
        this.messages.push(msg);

            // Lisää kirjoitusanimaatio botin viestiin
        let msg1 = {
            name: "Bot",
            message: "<span class='typing-animation'></span>"
        };
        this.messages.push(msg1);

        this.updateChatText(chatbox);
        textField.value = '';
    
        // Lisää automaattinen viesti botilta alkuun
        let msg2 = {
            name: "Bot",
            message: "Hei, olen Maria OpenAI:n ChatGPT:n tehostama apuri. Autan sinua saavuttamaan tavoitteesi tällä voit aloittaa esimerkiksi täyttämällä: \'<a href=\"{google_forms}\">Tavoitelomake</a>\' tai voidaan jutella vielä lisää, mutta voit kysyä minulta aina lomakkeesta, niin lähetän sen sinulle. Voit tutustua myös <a href=\"https://openai.com/policies/privacy-policy\">OpenAI:n Tietosuojalomakkeeseen</a>"
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
                    textField.value = ''

            setTimeout(() => {
                this.messages.pop(); // Poista kirjoitusanimaatio
                this.updateChatText(chatbox);
        
                this.messages.push(msg3);
                this.updateChatText(chatbox);
            }, 3000); // 3 sekunnin viive
                
    
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
