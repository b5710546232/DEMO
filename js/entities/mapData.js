game.mapData =[
  {level:"l",tile:undefined,object:{name:"name",x:0,y:0}},
  {level:"l",tile:"ground",object:{name:"name",x:0,y:0}},
  {level:"l",tile:"ground",object:"rock"},
  {level:"m",tile:"ground",object:{name:"name",x:0,y:0}},
  {level:"m",tile:"ground",object:"rock"},
  {level:"h",tile:"ground",object:{name:"name",x:0,y:0}},
];
var n  = game.mapData[0];
var l =  game.mapData[1];
var l1 = game.mapData[2];
var m = game.mapData[3];
var m1 = game.mapData[4];
var h = game.mapData[5];
game.platformMap = [
  [ l  ,  l , l ,  l , l ,  l , l ,  l , l ,  l , l ,  l , l ,  l  ,  l1 ,  l  ,  l1 ,  l ,  l1,   l ,  l1 , l ],
  [ l  ,  l , l ,  l , l ,  l , l ,  l , l1 ,  l , l1 ,  l , l1 ,  l  ,  l1 ,  l  ,  l1 ,  l ,  l1,   l ,  l , l ],
  [ l  ,  l1, l , l1 , n ,  n , l1 ,  l , l1 ,  l , l1 ,  l , l1 ,  l  ,  l1 ,  l  ,  l1 ,  l ,  l1,   l ,  l , l ],
  [ l  ,  l , m ,  m1 , m ,  m1 , m ,  m1 , m ,  m1 , n ,  n , m ,  m1  ,  m ,  m1  ,  n ,  n ,  l,   l1 ,  l , l ],
  [ l  ,  l1, l , l1 , n ,  n , l ,  l1 , l ,  n , l1 ,  l , l1 ,  l  ,  l1 ,  l  ,  l1 ,  l ,  l1,   l ,  l , l ],
  [ l  ,  l1 , l ,  l1 , l ,  l1 , l ,  l1 , l ,  l1 , l ,  l1 , l ,  l1  ,  l ,  l1  ,  l ,  l1 ,  l,   l ,  l , l ],
  [ l  ,  n , n ,  l , l1 ,  l , n ,  n , l1 ,  l , l1 ,  l , l1 ,  l  ,  l1 ,  l  ,  l1 ,  l ,  l1,   l ,  l , l ],
  [ l  ,  l1 , n ,  n , l ,  l , l ,  l , l1 ,  l , l1 ,  n , n ,  l  ,  l1 ,  n  ,  n ,  m ,  m1,   m ,  l , l ],

];
