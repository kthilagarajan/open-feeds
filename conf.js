var ENV = 'dev';

var conf = {
    dev: {
        hostName: '127.0.0.1',
        web: {
            port: 2010
        },
        db: {
            users: './data/users.db',
            feeds: './data/feeds.db'
        }

    },
    prod: {}
};

module.exports = conf[ENV];