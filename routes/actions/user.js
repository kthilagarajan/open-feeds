var _ = require('underscore');
var bcrypt = require('bcrypt');

var Users = function (app) {
    this.conf = app.conf;
    this.db = app.db;
};
module.exports = Users;

Users.prototype.isAuthorized = function (req, cbk) {
    if (req.session && req.session.user) {
        cbk(req.session.user)
    } else {
        cbk({
            status: false,
            err: "Not authorized"
        })
    }
}

Users.prototype.loginUser = function (req, cbk) {

    var self = this;
    var reqObj = req.query;

    self.db.users.findOne({ nick_name: req.body.nick_name }, function (err, docs) {
        if (err) {
            cbk(err)
            return
        }
        if (docs != null) {
            bcrypt.compare(req.body.password, docs.password, function (err, res) {
                if (res) {
                    req.session.user = docs;
                    cbk({
                        status: true,
                        data: docs
                    })
                } else {
                    cbk({
                        status: false,
                        err: "Invalid Password"
                    })
                }
            });

        } else {
            cbk({
                status: false,
                err: "Invalid Username/Password"
            })
        }
    });

};

Users.prototype.registerUser = function (req, cbk) {

    var self = this;
    var reqObj = req.query;

    self.db.users.find({ "nick_name": req.body.nick_name }, function (err, docs) {
        if (err) {
            cbk(err)
            return
        }
        if (docs.length > 0) {
            cbk({
                status: false,
                err: "User already exists"
            })
        } else {
            bcrypt.hash(req.body.password, 5, function (err, hash) {
                req.body.password = hash
                self.db.users.insert(req.body, function (err, newDoc) {
                    if (err) {
                        cbk({
                            status: false,
                            err: err
                        })
                    }
                    cbk({
                        status: true
                    })
                });
            });

        }
    });

};


Users.prototype.logout = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    req.session.destroy(function () {
        cbk({
            status: true
        })
    });
};