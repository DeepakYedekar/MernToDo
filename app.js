const express = require('express');
const app = express();
require('dotenv').config();
require('./DB/connection');
app.use(express.json());
const { user, item } = require('./routes/index');

app.use(user);

app.use(item);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is on port ${port}`));