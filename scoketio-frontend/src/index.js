import io from 'socket.io-client';

class Chat {
    constructor() {
        this.chatList = document.getElementById('chatList');

        this.socket = io({query: "nick=11"});

        this.socket.on('dong', function(data){
            console.log(data); // 'G5p5...'
        });

        this.socket.on('userDisconnect', (data) => {
            this.addSystemLine('<b>' + (data.nick.length < 1 ? 'Anon' : data.nick) + '</b> disconnected.');
        });

        this.socket.emit('ding', {data:'ddd'});
    }

    addSystemLine(message) {
        let newline = document.createElement('li');

        newline.className = 'system';
        newline.innerHTML = message;

        this.appendMessage(newline);
    }

    appendMessage(node) {
        if (this.chatList.childNodes.length > 10) {
            this.chatList.removeChild(this.chatList.childNodes[0]);
        }
        this.chatList.appendChild(node);
    };
}

window.onload = () => {
    new Chat();
};