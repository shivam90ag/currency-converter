var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose')
let authMiddleware = require('./middleware/authenticated')
var historyRouter = require('./routes/history');
var authRouter = require('./routes/auth');
var session = require("express-session")
var app = express();
var ws = require('ws');
var http = require('http');
sockets = [];
mongoose.connect('mongodb://mongo:27017/' + (process.env.NODE_ENV !== 'test' ? 'testDb' : 'utestDb'))
const server = http.createServer(app);
//initialize the ws server instance
const wss = new ws.Server({ server });
var i=0;
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if ( client.readyState === ws.OPEN) {
      client.send(data.toString())
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    sockets.push(ws);
    broadcast(sockets.length-1)
    
  });
  ws.on('close', function incoming(data){
    let index = sockets.indexOf(ws)
    if(index>-1){
      sockets.splice(index,1);
    }
    broadcast(sockets.length-1)
  })
  ws.on('error',function errorHandling(err){
    console.log(err)
  })
});
wss.on('error',function errorHandling(err){
  console.log(err)
})

app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
router.use('/auth', authRouter);
router.use('/history', historyRouter);
app.use('/api',authMiddleware.setSessionDataIntoHttpRequestObject,router);
app.use('/api/authenticate',(req,res)=>{
    if(req.isAuthenticated){
      res.status(200).json('authenticated');
    }else{
      res.status(401).json('unauthenticated');
    }
})

app.use(express.static(__dirname + '/../../dist'));
app.get('*', (req, res) => {
  // Load our src/app.html file
  //** Note that the root is set to the parent of this folder, ie the app root **
  res.sendFile('/dist/index.html', { root: __dirname + "/../../" });
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  // if()
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.message.match(/validation/g)) {
    res.status(400).json({ message: err.message })
  } else {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
  }
});

server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('listening on port 3000')
})

module.exports = app;
