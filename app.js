const express = require('express');
const controller = require('./controllers/todo');



const app = express();
app.set("view engine",'ejs');

app.use(express.static('public'));

controller(app);

app.listen(3000);
