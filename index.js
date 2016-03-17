var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // support json encoded bodies
// support encoded bodies
app.post('/randomPaste', function(req, res) {
    var files = fs.readdirSync(__dirname + '/pastes');
    var ranNum = Math.floor(Math.random() * files.length) + 0;
    console.log('sending them to: /pastes/' + files[ranNum]);
    res.end('pastes/' + files[ranNum]);
})

app.post('/index', function(req, res) {
    var files = fs.readdirSync(__dirname + '/pastes');
    var gen = [];
    var num = req.body.num;
    for (var i = 0; i < num; i++) {
        var ranNum = Math.floor(Math.random() * files.length) + 0;
        if (files[ranNum] === undefined) {

        } else {
            gen.push(files[ranNum]);
            files.splice(ranNum, 1);
        }
    }
    res.end(gen.join(','));
})

app.post('/', function(req, res) {
    var text = req.body.text;
    var files = fs.readdirSync(__dirname + '/pastes');
    for (var i = 0; i < files.length; i++) {
        files[i] = files[i].slice(0, -4);
    }
    console.log(files);
    fs.writeFile(__dirname + '/pastes/' + (Number(files[files.length - 1]) + 1) + '.txt', text);
    console.log("----------------------\nText created:\n\n" + text);
    res.end('pastes/' + (Number(files[files.length - 1]) + 1) + '.txt');
});
app.use('/pastes', express.static(__dirname + '/pastes'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});
app.get('/jquery.js', function(req, res) {
    res.sendFile(__dirname + '/jquery.js');
});
app.get('/javascript.js', function(req, res) {
    res.sendFile(__dirname + '/javascript.js');
})
app.get('/normalize.css', function(req, res) {
    res.sendFile(__dirname + '/normalize.css');
})
http.listen(3000, function() {
    console.log('listening on *:3000');
});
