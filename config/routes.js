//NewDayNature Router.

var multer = require('multer');

module.exports = function(app, router, mysql){

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

    app.get('/', function(req, res){

        res.sendfile('index.html');

    });

    app.use(multer({dest: './pictures/',
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            db.query('INSERT INTO img_location(id, img_url, favs) VALUES (' + ', ' + file.path + ', favs)', function(err){
                if(err) throw err;
                console.log(file.path);
            } )
        }
    }));

    app.get('/api/', function (req, res) {

        db.query('SELECT * FROM users', function (err, rows) {

            if(err) throw err;

            json = JSON.stringify(rows);

            res.send(json);

        });

    });

    app.get('/pictures/:id', function(req, res){

        var picUrl = req.params.id;
        console.log(picUrl);
        res.sendfile('/pictures/'+ picUrl);

    });



    app.post('/upload', function(req, res){

        res.send(req.files);

    })

    app.post('/local');

};
