var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); 
app.set('port', (process.env.PORT || 5000));

app.post('/login', function (req, res) {    
    console.log("cheking username and password " + new Date().toJSON())
    
    var login = req.body
    if (login.username == "admin" && login.password == "admin" ) {
        res.send()
    } 
    else {
        res.sendStatus(401)
    }
    
});

app.get('/login', function (req, res) {
    res.send("send a POST to /login with a body { \"username\": \"admin\", \"password\" : \"admin\" } ")
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});