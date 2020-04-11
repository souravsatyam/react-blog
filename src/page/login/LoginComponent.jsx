import React, { Component } from 'react';
import './LoginComponent.css';
import HeaderSegment from '../../segment/header/HeaderSegment';
import Axios from 'axios';
import { CONFIG } from '../../config/config';
import MySnackbarContentWrapper from '../../segment/snakBar/SnakBarSegment';

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = { isLoginPage: true, 
            heading: '', 
            registerData: { email: '', password: '', userName: '' }, 
            message: '', 
            isError: false,
            loginData: {userName: '', password: ''}};
    }

    componentWillMount() {
        if (window.location.href.indexOf('?') > -1) {
            let check_logout = window.location.href.split('?')[1].split('=')[1];
            if (check_logout == 'logout') {
                window.localStorage.removeItem('auth');
            }
        }
        
        let access_token = window.localStorage.getItem('auth');
        if (access_token) {
            this.props.history.push('/article');
        }

    }

    componentDidMount() {

        if (this.props.location.pathname == '/login') {
            this.setState({ isLoginPage: true, heading: 'Login' });
        } else if (this.props.location.pathname == '/register') {
            this.setState({ isLoginPage: false, heading: 'Register' });
        }
    }

    toggleLogin() {
        let loginOption = this.state.isLoginPage;
        this.setState({ isLoginPage: !loginOption });
    }

    handleInputChange(type, event) {
        let statesValue = { ...this.state.registerData };
        statesValue[type] = event.target.value;
        this.setState({ registerData: statesValue });
    }

    registerUser(event) {
        event.preventDefault();

        Axios.post(CONFIG.url+'/api/v1/register', this.state.registerData).then(
            resp => {
                this.setState({ isError: false, message: resp.data.message })
            }).catch(err => {
                console.log(err.response)
                this.setState({ isError: true, message: err.response.data.message.errmsg });
            })
    }

    handleLoginChnage(type, event) {
        let loginData = {...this.state.loginData};
        loginData[type] = event.target.value;
        this.setState({loginData: loginData});
    }

    loginUser(event) {
        event.preventDefault();

        Axios.post(CONFIG.url+'/api/v1/login', this.state.loginData).then(
            resp => {
                window.localStorage.setItem('auth', resp.data.token);
                window.localStorage.setItem('id_user', resp.data.id)
                this.props.history.push('/article');
            }).catch(err => {
                this.setState({ isError: true, message: err.response.data.data });
        })

    }

    render() {
        const divStyle = {
            color: (this.state.isError) ? 'red' : 'green',
            textAlign: 'center'

        };

        return (
            <div>
                <HeaderSegment />
                <div class="form-modal">

                    <div class="form-toggle">
                        <button id="login-toggle" onClick={this.toggleLogin.bind(this)}>{this.state.heading}</button>

                    </div>
                    {(this.state.isLoginPage) ? <div id="login-form">
                        <form onSubmit={this.loginUser.bind(this)}>
                            <input type="text" placeholder="Enter email or username" value={this.state.loginData.userName} onChange={this.handleLoginChnage.bind(this, 'userName')} required/>
                            <input type="password" placeholder="Enter password" value={this.state.loginData.password} onChange={this.handleLoginChnage.bind(this, 'password')} required/>
                            <button type="submit" class="btn login">login</button>
                            <p><a href="javascript:void(0)">Forgotten account</a></p>
                            <hr />
                            <button type="button" class="btn -box-sd-effect"> <i class="fa fa-google fa-lg" aria-hidden="true"></i> sign in with google</button>
                            <button type="button" class="btn -box-sd-effect"> <i class="fa fa-linkedin fa-lg" aria-hidden="true"></i> sign in with linkedin</button>
                            <button type="button" class="btn -box-sd-effect"> <i class="fa fa-windows fa-lg" aria-hidden="true"></i> sign in with microsoft</button>
                        </form>
                    </div> :
                        <div id="login-form">
                            <form onSubmit={this.registerUser.bind(this)}>
                                <input type="email" placeholder="Enter your email" value={this.state.registerData.email} onChange={this.handleInputChange.bind(this, 'email')} required />
                                <input type="text" placeholder="Choose username" value={this.state.registerData.userName} onChange={this.handleInputChange.bind(this, 'userName')} required />
                                <input type="password" placeholder="Create password" value={this.state.registerData.password} onChange={this.handleInputChange.bind(this, 'password')} required />
                                <button type="submit" class="btn signup">create account</button>
                                <p>Clicking <strong>create account</strong> means that you are agree to our <a href="javascript:void(0)">terms of services</a>.</p>
                                <hr />
                                <button type="button" class="btn -box-sd-effect"> <i class="fa fa-google fa-lg" aria-hidden="true"></i> sign up with google</button>
                                <button type="button" class="btn -box-sd-effect"> <i class="fa fa-linkedin fa-lg" aria-hidden="true"></i> sign up with linkedin</button>
                                <button type="button" class="btn -box-sd-effect"> <i class="fa fa-windows fa-lg" aria-hidden="true"></i> sign up with microsoft</button>
                            </form>
                        </div>}
                </div>
                <div className="message_box">
                    <MySnackbarContentWrapper
                    variant="error"
                    className="margin"
                    message={this.state.message}
                    open={this.state.isError}
                    />

                <MySnackbarContentWrapper
                    variant="success"
                    className="margin"
                    message={this.state.message}
                    open={!this.state.isError && this.state.message != ''}
                    />
                </div>
                

            </div>


        )
    }
}

export default LoginComponent;