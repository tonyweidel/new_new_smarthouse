var express = require('express');
var router = express.Router();

var redis = require('redis');

let client = redis.createClient();

//Redis client
client.on('connect',function(){
  console.log("You did it! You did it! You did it! Yay! (Lo hiciste!)");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'the devices page', otherthing:"otherstring"});
});

router.get('/all_devices', function(req, res, next) {
    res.render('devices');
});

router.get('/add', function(req, res, next) {
    res.render('add');
});

router.get('/lights', function(req, res, next) {
    res.render('lights');
});

router.post('/add', function(req, res, next) {
    res.render('add');
});

router.post('/search/',function (req, res, next){
    let id = "device"+req.body.id;
    client.hgetall(id,function(err,obj){
        if(!obj){
            res.render('error',{
                error: 'device does not exist',
                title: 'NO!'
            });
        }
        else{
            console.log(obj);
            obj.id = "device"+req.body.id;
            res.render('device',{
                device:obj
            });
        }
    })
});

module.exports = router;
