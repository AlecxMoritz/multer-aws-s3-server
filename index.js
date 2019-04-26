require('dotenv').config();

const app = require('express')();
const db = require('./db');

db.sync();

app.use('/images', require('./awsController'));

app.listen(8080, ()=> {
    console.log('listening 3000');
});