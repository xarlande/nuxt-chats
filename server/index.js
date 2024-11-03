// server/index.js

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

// Обробка підключення
io.on('connection', (socket) => {
    console.log('Користувач підключився');

    // Отримання повідомлення від клієнта
    socket.on('sendMessage', (message) => {
        // Відправка повідомлення всім клієнтам
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Користувач відключився');
    });
});

server.listen(3001, () => {
    console.log('Сервер Socket.IO запущено на порту 3001');
});
