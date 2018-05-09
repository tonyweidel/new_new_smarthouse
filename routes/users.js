var express = require('express');
var router = express.Router();
var redis = require('redis');

let client = redis.createClient();

//Redis client
client.on('connect',function(){
  console.log("We did it! We did it! We did it! Yay! (La hicimos!)");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.render('add');
});
router.post('/add', function(req, res, next) {
    let deviceid = 'device'+req.body.id;
    let name = req.body.devicename;
    let type = req.body.type;

    client.hmset(deviceid, [
        'name', name,
        'type', type
    ],function(err,reply){
        if(err){
            console.log(err);
        }
        else{
            console.log(reply);
            res.redirect('/');
        }
    })
});

router.delete('/delete/:id',function(req,res){
    client.del(req.params.id);
    res.redirect('/')
});
module.exports = router;
