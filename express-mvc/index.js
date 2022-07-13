const express = require('express');
const friendsController = require('./controllers/friends.controller');


const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/friends', friendsController.addFriend);
app.get('/friends', friendsController.getFriends);
app.get('/friends/:friendId', friendsController.getFriend);

app.listen(PORT, () => {
    console.log(`Server started successfully and listening on port: ${PORT}`);
});