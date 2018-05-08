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

app.post('/add', bodyParser.json(), (req,res)=>{
    var a = req.body.a;
    var b = req.body.b;

    var sum = a + b;

    res.json(sum);
});

app.listen(process.env.PORT || 3003, ()=>{
    console.log('Connected 3003 port!!');
})

