// Load the http module to create an http server.
var http = require('http'),
express = require('express'),
ejs =require('ejs'),
reqauest = require('request');



var app = module.exports = express();


app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// all environments
app.set('port', process.env.PORT || 8081);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/static/'));


app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');  




/**
* Render the index page.
*/
app.get('/',  function index(request, response) {

  response.render('index.html');
});


/**
* Render the login page.
*/
app.post('/login',  function index(request, response) {
  var name = request.body.name;
  request.session.NAME= name;

  response.redirect('home');
});

app.get('/logout',  function index(request, response) {
 request.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  response.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
}); 
});
/**
* Render the home page.
*/
app.get('/home',  function index(request, response) {

 if(request.session.NAME){
  response.render('home.html',{
    name: request.session.NAME
  });
}else{
  response.redirect('/');
}

});



// Configure our HTTP server to respond with Hello World to all requests.
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



