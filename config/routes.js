//NewDayNature Router.

var multer = require('multer');

module.exports = function(app, router, mysql) {

    var db = mysql.createConnection({
        port: 3306,
        host: 'box1077.bluehost.com',
        user: 'stephgv0_admin',
        password: '123abc',
        database: 'stephgv0_newdaynature'
    });

    router.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    });

    app.post('postLocale/', function (req, res){

        console.log('test');
        console.log(req.params.user_id);
        res.send(req.params);

    });

    app.use(multer({
        dest: './pictures/',
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            db.query('INSERT INTO img_location(id, img_url, favs) VALUES (' + ', ' + file.path + ', favs)', function (err) {
                if (err) throw err;
                console.log(file.path);
            })
        }
    }));

    app.get('/getLocale', function (req, res) {

        db.query('SELECT * FROM logs', function (err, rows) {

            if (err) throw err;

            json = JSON.stringify(rows);

            res.send(json);

        });

    });

    app.get('/pictures/:id', function (req, res) {

        var picUrl = req.params.id;
        console.log(picUrl);
        res.sendfile('/pictures/' + picUrl);

    });


    app.post('/upload', function (req, res) {

        res.send(req.files);

    });

    app.get('/getImgUrl', function (req, res) {

        db.query('SELECT * FROM img_location', function (err, rows) {

            if (err) throw err;

            json = JSON.stringify(rows);

            res.send(json);

        });

    });

    /*app.post('postLocale/v1/stories/:user_id/:location:/longitude/:latitude/:caption/:natureMedium/:activity/:ratings', function (req, res) {

        var user_id = req.params.user_id,
            location = req.params.location,
            longitude = req.params.longitude,
            latitude = req.params.latitude,
            caption = req.params.caption,
            natureMedium = req.params.natureMedium,
            activity = req.params.activity,
            ratings = req.params.ratings;

        console.log(req.params);
        res.send(req.params);

        db.query('INSERT INTO logs (user_id, location, longitude, latitude, caption, natureMedium, activity, ratings VALUES (' + user_id + ', "' + location + '", ' + longitude + ', ' + latitude + ', "' + caption + '", "' + natureMedium + '", "' + activity + '", ' + ratings + ');',
            function (err) {

                if (err) throw err;

                console.log('It works!');

            });

    });*/

    app.get('/', function (req, res) {

        res.sendfile('index.html');

    });

};