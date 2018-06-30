var _ = require('underscore');

var Feeds = function (app) {
    this.conf = app.conf;
    this.db = app.db;
};
module.exports = Feeds;

Feeds.prototype.getAllFeeds = function (req, cbk) {

    var self = this;
    var q = req.query
    var reqObj = {};
    if (q.nick_name) {
        reqObj = { nick_name: q.nick_name }
    }

    self.db.feeds.find(reqObj, function (err, docs) {
        cbk({
            status: true,
            data: _.sortBy(docs,"timestamp").reverse()
        })
    })

};

Feeds.prototype.addFeed = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.feeds.insert(req.body, function (err, newDoc) {
        cbk({
            status: true,
            data: newDoc
        })
    })
};


Feeds.prototype.likeFeed = function (req, cbk) {

    var self = this;
    var q = req.query;
    // feed_id and nick_name
    self.db.feeds.findOne({ _id: req.body.feed_id }, function (err, feedObj) {
        if (err) {
            cbk({
                status: false,
                err: err
            })
            return
        }
        feedObj.likes = feedObj.likes ? feedObj.likes : []
        if (feedObj.likes.indexOf(req.body.nick_name) >= 0) {
            feedObj.likes = _.without(feedObj.likes, req.body.nick_name)
        } else {
            feedObj.likes.push(req.body.nick_name)
        }
        self.db.feeds.update({ _id: req.body.feed_id }, feedObj, { upsert: false }, function (err, returnObj) {
            if (err) {
                cbk({
                    status: false,
                    err: err
                })
                return
            }
            cbk({
                status: true,
                data: returnObj
            })
        })

    })

};

Feeds.prototype.commentOnFeed = function (req, cbk) {

    var self = this;
    var q = req.query;

    // feed_id, nick_name, time_stamp, comment
    self.db.feeds.findOne({ _id: req.body.feed_id }, function (err, feedObj) {
        if (err) {
            cbk({
                status: false,
                err: err
            })
            return
        }
        feedObj.comments = feedObj.comments ? feedObj.comments : []
        feedObj.comments.push(req.body)
        self.db.feeds.update({ _id: req.body.feed_id }, feedObj, { upsert: false }, function (err, returnObj) {
            if (err) {
                cbk({
                    status: false,
                    err: err
                })
                return
            }
            cbk({
                status: true,
                data: returnObj
            })
        })

    })
};