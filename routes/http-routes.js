var User = require("../routes/actions/user")
var Feeds = require("../routes/actions/feeds")

var Routes = function (app) {
    this.app = app;
    this.user = new User(app)
    this.feeds = new Feeds(app)
    this.init();
};
module.exports = Routes;

Routes.prototype.init = function () {
    var self = this;

    function sessionCheck(req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            next();
            /* res.status(401)
            res.json({ status: false, err: "Not logged in!" }) */
        }
    }

    self.app.get('/', function (req, res) {
        res.json({ status: true, data: "Welcome to OpenFeeds" });
    });

    // User
    self.app.post('/login', function (req, res) {
        self.user.loginUser(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/isAuthorized', function (req, res) {
        self.user.isAuthorized(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/register', function (req, res) {
        self.user.registerUser(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/find', sessionCheck, function (req, res) {
        self.user.findUser(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/logout', sessionCheck, function (req, res) {
        self.user.logout(req, function (response) {
            res.json(response);
        })
    });

    // Feed
    self.app.get('/getAllFeeds', sessionCheck, function (req, res) {
        self.feeds.getAllFeeds(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/addFeed', sessionCheck, function (req, res) {
        self.feeds.addFeed(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/likeFeed', sessionCheck, function (req, res) {
        self.feeds.likeFeed(req, function (response) {
            res.json(response);
        })
    });

    self.app.post('/commentOnFeed', sessionCheck, function (req, res) {
        self.feeds.commentOnFeed(req, function (response) {
            res.json(response);
        })
    });

};