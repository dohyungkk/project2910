var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
// two __
app.set('views', path.resolve(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/game1', (req, res)=>{
    res.render('game1');
});

app.get('/game2', (req,res)=>{
    res.render('game2');
});

app.get('/login', (req, res)=>{
	res.render('login');
})

app.listen(process.env.PORT || 3003, ()=>{
    console.log('Connected 3003 port!!');
})

