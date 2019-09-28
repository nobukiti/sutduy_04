// ここに書くべきことではないのでハマるときついので書いておく
// herokuでexpressを使うときは以下の要領で使うべし
// /ディレクトリ（今回ならstudy_01）にProcfileを作っておく
// Procfileの中身は web: node app.jsとしておく
// その上で以下のコマンドでherokuにpushする
// git init
// git add --a
// git commit -m "xxxx"
// heroku create
// git push heroku master
// 後はherokuでダッシュボードからアプリを見るだけ
// ただherokuは無料だと5アプリまでなので注意

// expressに関する変数
var express = require("express");
var app = express();
var http = require("http").Server(app);
const PORT = process.env.PORT || 3000;

// socket.ioに関する変数
var io = require("socket.io")(http);

// pathに関する変数
var path = require("path");
const filePath = 'static';

// mongodbに関する変数
var mongodb = require("mongodb");
var mongoclien = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
var dbNaem = "score";

// 初期化処理
function init() {
  app.use(express.static(path.join(__dirname, filePath)));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + filePath + '/html/index.html');
  });
  http.listen(PORT, () => {
    console.log("start http.");
  });
}

// socket.ioの処理
function socketIO() {
  io.on('connection', socket => {
    socket.on('apple', msg => {
      console.log('server socket.io @apple');
    });
  });
}

// init()処理の実行
init();

// socket.io処理の実行
socketIO();