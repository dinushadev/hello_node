// Load the http module to create an http server.
var http = require('http'),
express = require('express'),
ejs =require('ejs'),
reqauest = require('request');



var app = module.exports = express();


app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// all environments
app.set('port', process.env.PORT || 8080);
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


app.get('/loadext',  function index(request, response) {
      reqauest.get('http://transferauthentication.next.qaprod.ecollege.com/Main/AdminMode/TranslateToken/TranslateAndRedirectFromPSHView.ed?token=7%2418%2402%2410z%2409Li%2418%2411P%2428M%2417k%24148OxK%2419%2413O%2426%24197xX%2408L9Rz%2413oi%2410%2403LKz0QpiF%2419GNi%2414%2402Ru%2413j%2425ow%24217t0XGF%2412vw9b%2417%2403Pw%2403kf%2414%2405Om%2405gd%2413yTp%2403dd%2403%2411Gx%2412k55%2404FwQE1&redirectUrl=http%3a%2f%2fframeset.next.qaprod.ecollege.com%2fMain%2fAllMode%2fFramesetHybrid%2fFramesetFromPSHView.ed%3fihm%3d2462505&createNewCookie=true&returnUrl=http%3a%2f%2fdemo-portello-ui.dev-openclass.com%2fhome&logoutUrl=http%3a%2f%2fdemo-portello-ui.dev-openclass.com%2flogout&S=4ff91543645445d5875c0a6b7b1d214f', {
          headers : {
            "Content-Type" : "application/json"
          }

        },function (e, r, body) {
              console.log('error: %s', e);
              console.log('response: %s', r);
              console.log('body: %s', JSON.stringify(body));
              response.end(body);
        });

});


// Configure our HTTP server to respond with Hello World to all requests.
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



