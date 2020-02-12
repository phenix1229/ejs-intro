const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const users = require('./models/Users')
require('dotenv').config();
const port = process.env.PORT || '3000';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/first', (req, res) => {
    res.render('main/home', {name: 'Bill'})
});

app.get('/location/:color/:car', (req, res) => {
    const {color, car} = req.params;
    let places = [{city:'New York', state:'NY'},{city:'Stamford', state:'CT'}]
    res.render('main/location', {color, car, places});
});

app.get('/users', (req, res) => {
    const {name, city} = users;
    res.render('main/users', {name, city, users});
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})