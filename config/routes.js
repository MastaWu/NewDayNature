//NewDayNature Router.js

module.exports = function(app, router, mysql){

    var db = mysql.createConnection({
        port: 3306,
        host: 'box1077.bluehost.com',
        user: 'stephgv0_admin',
        password: '123abc',
        database: 'stephgv0_hearmenow'
    });

    router.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    });


    app.get('/api/', function (req, res) {

        db.query('SELECT * FROM users', function (err, rows) {

            if(err) throw err;

            json = JSON.stringify(rows);

            res.send(json);

        });

    });

};