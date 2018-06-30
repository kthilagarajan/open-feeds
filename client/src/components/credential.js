import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from "../actions/login-action"
import { registerUser } from "../actions/register-action"

class Credential extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                nick_name: "",
                password: ""
            },
            new_user: {
                nick_name: "",
                password: ""
            },
        }
        this.initNewState = this.state.new_user
        if (window.localStorage.getItem("loggedIn") && window.localStorage.getItem("loggedIn") == 'true') {
            this.props.history.push("/");
        }
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleRegisterChange = this.handleRegisterChange.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    handleLoginChange(event) {
        if (event.target.name == "nick_name") {
            var l_data = this.state.user
            l_data.nick_name = event.target.value
            this.setState(l_data);
        }
        if (event.target.name == "password") {
            var l_data = this.state.user
            l_data.password = event.target.value
            this.setState(l_data);
        }
    }

    handleRegisterChange(event) {
        if (event.target.name == "nick_name") {
            var l_data = this.state.new_user
            l_data.nick_name = event.target.value
            this.setState(l_data);
        }
        if (event.target.name == "password") {
            var l_data = this.state.new_user
            l_data.password = event.target.value
            this.setState(l_data);
        }
    }

    isValidationSuccess(uObj){
        return uObj.nick_name != "" && uObj.password != ""
    }

    doRegister(event) {
        event.preventDefault()
        if(!this.isValidationSuccess(this.state.new_user)){
            alert("Provide necessary params")
            return
        }
        var self = this
        let r_return = this.props.registerUser(this.state.new_user)
        r_return.payload.then(function (response) {
            if (response.status) {
                alert("Registered Successfully! Do Login!")
                window.location.reload()
            } else {
                alert(response.err)
            }
        })
    }

    doLogin(event) {
        event.preventDefault()
        if(!this.isValidationSuccess(this.state.user)){
            alert("Provide necessary params")
            return
        }
        var self = this
        let l_return = this.props.loginUser(this.state.user)
        l_return.payload.then(function (response) {
            if (response.status) {
                window.localStorage.setItem("loggedIn", "true")
                window.localStorage.setItem("user", JSON.stringify(response.data))
                self.props.history.push("/app");
            } else {
                alert(response.err)
            }

        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">
                        OpenFeeds
          </h1>
                </header>
                <div className="demo-card-wide mdl-card mdl-shadow--2dp header-card">

                    <div className="mdl-card__supporting-text w-100">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--6-col">
                                <form onSubmit={this.doRegister} ref="rform">
                                    <h4>Register</h4>
                                    <hr className="hr-register" />
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w-80">
                                        <input name="nick_name" onChange={this.handleRegisterChange} className="mdl-textfield__input" type="text" id="nick_name" />
                                        <label className="mdl-textfield__label" htmlFor="nick_name">Nick Name</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w-80">
                                        <input name="password" onChange={this.handleRegisterChange} className="mdl-textfield__input" type="password" id="password" />
                                        <label className="mdl-textfield__label" htmlFor="password">Password</label>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div>
                                        <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect primary-btn">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="mdl-cell mdl-cell--6-col">
                                <h4>Login</h4>
                                <hr className="hr-login" />
                                <form onSubmit={this.doLogin} >
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w-80">
                                        <input value={this.state.user.nick_name} name="nick_name" onChange={this.handleLoginChange} className="mdl-textfield__input" type="text" id="l_nick_name" />
                                        <label className="mdl-textfield__label" htmlFor="l_nick_name">Nick Name</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w-80">
                                        <input value={this.state.user.password} type="password" name="password" onChange={this.handleLoginChange} className="mdl-textfield__input" id="l_password" />
                                        <label className="mdl-textfield__label" htmlFor="l_password">Password</label>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div>
                                        <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect secondary-btn">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser: loginUser, registerUser: registerUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Credential);
