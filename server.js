var express = require("express");
var app = express();
var session = require('express-session');

app.use(session({
    secret: 'skol',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function (request, response){
    if (!request.session.counter) {
        request.session.counter = 1
    }
    else{
        request.session.counter +=1
    }
    var contents = {
        counter: request.session.counter
    }
    response.render('index', contents)
})

app.get("/reset", function (request, response){
    request.session.destroy();
    response.redirect('/')
})

app.get("/addTwo", function (request, response){
    request.session.counter += 1;
    response.redirect('/')
})

app.listen(8000, function(){
    console.log("listening on port 8000");
})

