<template>
  <div class="chat-container">
    <div class="messages">
      <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
      >
        {{ message }}
      </div>
    </div>
    <input
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        placeholder="Напишіть повідомлення"
    />
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      inputMessage: '',
      messages: [],
      socket: null,
    };
  },
  mounted() {
    // Підключення до Socket.IO сервера
    this.socket = io('http://localhost:3001');

    // Слухання події 'newMessage' від сервера
    this.socket.on('newMessage', (message) => {
      this.messages.push(message);
    });

    // Обробка помилок з'єднання
    this.socket.on('connect_error', (err) => {
      console.error('Помилка з\'єднання:', err);
    });
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim() !== '') {
        // Відправка повідомлення на сервер
        this.socket.emit('sendMessage', this.inputMessage);
        this.inputMessage = '';
      }
    },
  },
  beforeDestroy() {
    // Відключення від сервера при виході з компонента
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
}

.messages {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
