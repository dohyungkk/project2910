var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
    secret: 'akljflk3j41341',
    resave: false,
    saveUninitialized: true,
}));

app.listen(3003, ()=>{
    console.log('Connected 3003 port!!');
    
})

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    socketPath: '/Applications/mampstack-7.1.17-0/mysql/tmp/mysql.sock',
    password : 'hendrick3',
    database : 'o2'
});

conn.connect();

app.get('/', (req,res)=>{
    res.sendfile('main.html');
})

app.post('/login', (req,res)=>{
    var id = req.body.userid;
    var pwd = req.body.password;

    var sql = 'INSERT INTO user VALUES(?,?)';
    conn.query(sql, [id,pwd], (err, row, fields)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else{
            res.redirect('/');
        }
    })
})

app.get('/login', (req,res)=>{
    var output=`
    <h1>Login</h1>
    <form action="/login" method="post">
        <p>
            <input type="text" name="userid" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;

    res.send(output);
})
