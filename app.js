var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var bodyParser = require('body-parser');

// HEADERS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/room')
    // create a new room using POST (accessed at POST http://localhost:8080/api/room)
    .post(function(req, res) {
        //Need to send it a body x-www-form-urlencoded field called room with the json for a room
        //let room = JSON.parse(req.body.room);

        console.log(req.body.test);

        //SAVE ROOM HERE
        //Writing file Sync (overwrites)
        var roomFile = 'c:/dev/constellation.js/room1.json';
        //fs.writeFileSync(fileSource, "Writing to a file synchronously from node.js111", {"encoding":'utf8'});
        //var roomFile = 'c:/dev/constellation.js/room' + req.params.room_id + '.json';
        
        //fs.writeFileSync(roomFile, req.body.room, {"encoding":'utf8'});

        //return some json
        res.json({"message": "success"});

        /* save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: roomName + 'created!' });
        });
        */
    });



    router.route('/room/:room_id')
    // get the room with that id (accessed at GET http://localhost:8080/api/room/:room_id)
    .get(function(req, res) {
        //Load Room into variable based on id
        //req.params.room_id

        //reads file
        var fileSource = 'c:/dev/constellation.js/room' + req.params.room_id + '.json';
        var fileData = fs.readFileSync(fileSource, "utf8");
        var room = JSON.parse(fileData);

        //return room
        res.json(room);
        
        /*
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
        */
    });

    router.route('/room/:room_id')
    // update the room with this id (accessed at PUT http://localhost:8080/api/room/:room_id)
    .put(function(req, res) {
        //Writing file Sync (overwrites)
        var roomFile = 'c:/dev/constellation.js/room' + req.params.room_id + '.json';
        fs.writeFileSync(roomFile, req.body.room, {"encoding":'utf8'});
    });

// test route to make sure everything is working (accessed at GET http://localhost:2000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);



// ROUTES FOR SITE
app.get('/', function(request, response){
    response.sendFile(__dirname + '/src/index.html');
});

app.use('/', express.static(__dirname + '/src'));


//RUN SERVER
server.listen(2000, function(){
    console.log('Server Started on 2000');
});