var express = require('express');
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');

var app = express();

var db = new sqlite3.Database('./database', function(error) {
    if(error) throw error;
    db.run("CREATE TABLE IF NOT EXISTS comments (name TEXT, comment TEXT);");
});

app.use(bodyParser.urlencoded());

// Still using the public folder for static resources such as CSS, images
app.use(express.static('public'));

// Configure out view engine
app.engine('.html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    db.all('SELECT * FROM comments;', function (error, rows) {
        if(error) throw error;
        res.render('index.html', { comments: rows });
    });
});

app.post('/', function (req, res) {
    db.run('INSERT INTO comments VALUES ("' + req.body.name + '", "' + req.body.comment + '");');
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});