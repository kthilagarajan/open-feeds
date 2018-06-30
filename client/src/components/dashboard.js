import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFeeds, addOneFeed, likeFeed, addOneComment } from '../actions/home-action';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feeds: [],
            feed_text: "",
            username : JSON.parse(window.localStorage.getItem("user")).nick_name
        }
        this.getFeeds()
        var self = this
        setInterval(() => {
            self.getFeeds()
        }, 30000)
        this.addFeed = this.addFeed.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.likeTheFeed = this.likeTheFeed.bind(this);
        this.addComment = this.addComment.bind(this);
        this.openPost = this.openPost.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    getFeeds() {
        var self = this
        let f_return = this.props.getFeeds()
        f_return.payload.then(function (response) {
            if (response.status) {
                self.setState({
                    feeds: response.data
                })
            } else {
                alert(response.err)
            }
        })
    }

    addFeed() {
        var self = this
        var feedObj = {
            "nick_name": JSON.parse(window.localStorage.getItem("user")).nick_name,
            "feed_content": this.state.feed_text,
            "timestamp": (new Date()).getTime()
        }
        let f_return = this.props.addOneFeed(feedObj)
        f_return.payload.then(function (response) {
            if (response.status) {
                window.location.reload()
            } else {
                alert(response.err)
            }
        })
    }

    likeTheFeed(f_Obj) {
        var self = this
        var feedObj = {
            "nick_name": JSON.parse(window.localStorage.getItem("user")).nick_name,
            "feed_id": f_Obj._id
        }
        let like_return = this.props.likeFeed(feedObj)
        like_return.payload.then(function (response) {
            if (response.status) {
                self.getFeeds()
                // window.location.reload()
            } else {
                alert(response.err)
            }
        })
    }
    addComment(f_Obj) {
        var self = this
        console.log(f_Obj)
        var feedObj = {
            "nick_name": JSON.parse(window.localStorage.getItem("user")).nick_name,
            "feed_id": f_Obj._id,
            "time_stamp": (new Date()).getTime(),
            "comment": f_Obj.comment_text
        }
        let like_return = this.props.addOneComment(feedObj)
        like_return.payload.then(function (response) {
            if (response.status) {
                f_Obj.comment_text = ""
                self.getFeeds()
                // window.location.reload()
            } else {
                alert(response.err)
            }
        })
    }

    handleChange(event) {
        this.setState({
            feed_text: event.target.value
        });
    }

    handleCommentChange(event, fObj) {
        fObj.comment_text = event.target.value
    }

    openPost() {
        console.log("Comment")
    }
    doLogout() {
        window.localStorage.clear()
        window.location.reload()
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">
                        OpenFeeds

                </h1>
                    <a onClick={this.doLogout} className="out">
                        Logout
                </a>
                </header>
                <div className="demo-card-wide mdl-card mdl-shadow--2dp header-card">
                    <div className="mdl-card__supporting-text w-100">
                        <textarea name="feed_text" onChange={this.handleChange} className="text-area" placeholder={'Hi '+this.state.username+', Say what you did interesting today?'}></textarea>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a onClick={this.addFeed} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Publish
                        </a>
                        <span>
                            
                        </span>
                    </div>
                </div>
                <div className="posts">
                    <div className="mdl-grid">
                        {this.state.feeds.map((fObj, index) =>
                            <div className="mdl-cell mdl-cell--6-col" key={fObj._id}>
                                <div className="demo-card-wide mdl-card mdl-shadow--2dp message-card w-100">
                                    <div className="mdl-card__title user_name">
                                        <p className="text-left margin-none">
                                            {fObj.nick_name}
                                            <span className="timer"><TimeAgo date={fObj.timestamp} live="true" /></span>
                                        </p>
                                    </div>
                                    <div className="mdl-card__supporting-text">
                                        {fObj.feed_content}
                                    </div>
                                    <div className="mdl-card__actions mdl-card--border">
                                        <a onClick={() => { this.likeTheFeed(fObj) }} title={(fObj.likes && fObj.likes.length > 0) ? fObj.likes.join(",") : ('Be the first to like')} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                            {(fObj.likes && fObj.likes.indexOf(this.state.username) >= 0) ? (
                                                <i className="material-icons" >favorite</i>
                                            ) : (
                                                    <i className="material-icons" >favorite_outline</i>
                                                )}
                                            &nbsp;
                                            {fObj.likes && fObj.likes.length ? fObj.likes.length : ''}
                                            {fObj.likes && fObj.likes.length > 0 ? (
                                                ' Likes'
                                            ) : (
                                                    'Like'
                                                )}

                                        </a>
                                        <a onClick={this.openPost} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                            <i className="material-icons">comment</i>
                                            &nbsp;
                                            {fObj.comments && fObj.comments.length > 0 ? fObj.comments.length + " " : ''}
                                            Comments
                                    </a>
                                    </div>
                                    <div className="mdl-card__actions mdl-card--border new-comment">
                                        {(fObj.comments && fObj.comments.length > 0) ?
                                            (<div className="otherComments">
                                                {fObj.comments.map((cObj) =>
                                                    <div className="each" key={cObj.time_stamp}>
                                                        <span className="title">{cObj.nick_name}</span> <span className="message">{cObj.comment}</span>
                                                    </div>
                                                )}
                                            </div>) : ('')
                                        }
                                        <textarea onChange={(event) => this.handleCommentChange(event, fObj)} value={fObj.comment_text} rows="3" placeholder="write your comment here" className="w-98"></textarea>
                                        <a onClick={() => { this.addComment(fObj) }} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Add Comment</a>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        all_feeds: state.feeds
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getFeeds: getFeeds, addOneFeed: addOneFeed, likeFeed: likeFeed, addOneComment: addOneComment }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);