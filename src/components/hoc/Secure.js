import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config';

const Secure = (ChildComponent) => {

  return class Secure extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: false,
        password: '',
      };
    }

    componentDidMount() {
      this.checkLogin();
    }

    checkLogin() {
      const token = this.retrieveToken();
      if (this.state.isLoggingIn || token === '') {
        return;
      }

      this.setState(prevState => ({
        ...prevState,
        isLoggingIn: true,
      }));
      
      axios.post(`${config.LOGIN_URL}/verify`, { token })
      .then(response => {
        const { status, token } = response.data;

        this.setState(prevState => ({
          ...prevState,
          isLoggedIn: status,
          isLoggingIn: false
        }));

        this.saveToken(token);
      });
    }

    retrieveToken = () => {
      const sessionString = localStorage.getItem('token');

      if (!sessionString) {
        return "";
      }

      try {
        const { token } = JSON.parse(sessionString);
        return token;
      } catch (error) {
        return "";
      }
    }
    
    saveToken = token => {
      localStorage.setItem('token', JSON.stringify({
        token,
      }));
    }

    handleSubmit = event => {
      event.preventDefault();

      if (this.state.isLoggingIn) {
        return;
      }

      if (this.state.password.trim() === '') {
        this.setState(prevState => ({
          ...prevState,
          password: '',
        }));
        return;
      }

      this.setState(prevState => ({
        ...prevState,
        isLoggingIn: true,
      }));

      axios.post(`${config.LOGIN_URL}/login`, { password: this.state.password })
      .then(response => {
        const { status, token } = response.data;

        if (status) {
          this.saveToken(token);
        }

        this.setState(prevState => ({
          ...prevState,
          isLoggedIn: status,
          loginError: !status,
          isLoggingIn: false,
          password: '',
        }));
      })
      .catch(error => {
        this.setState(prevState => ({
          ...prevState,
          isLoggedIn: false,
          loginError: true,
          isLoggingIn: false,
          password: '',
        }));
      });
    }

    handleChange = event => {
      const { value } = event.target;

      this.setState(prevState => ({
        ...prevState,
        password: value,
      }));
    }

    handleFocus = () => {
      if(this.state.loginError === false) {
        return;
      }
      
      this.setState(prevState => ({
        ...prevState,
        loginError: false,
        password: '',
      }));
    }

    renderErrorMessage() {
      if (!this.state.loginError) {
        return;
      }

      return (
        <div className="login__group login__group--error">
          The password is invalid.
        </div>
      );
    }

    render() {
      if (this.state.isLoggedIn) {
        return <ChildComponent />;
      }
      
      return (
        <div className="loginPage">
          <form 
            className={`login ${this.state.isLoggingIn ? 'login--active' : ''}`}
            onSubmit={this.handleSubmit}
          >
            <h1 className="login__title">Password</h1>
            <div className="login__group">
              <input
                type="password"
                className={`login__input ${ this.state.loginError ? 'login__input--error' : '' }`}
                placeholder="✴✴✴✴✴✴"
                value={this.state.password}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                disabled={ this.state.isLoggingIn }
              />
            </div>

            { this.renderErrorMessage() }

            <div className="login__group login__group--buttonGroup">
              <button
                className="login__button"
                onClick={this.handleSubmit}
                disabled={ this.state.isLoggingIn }
              >
                {
                  this.state.isLoggingIn ? 'Signing in...' : 'Sign in'
                }
              </button>
            </div>
          </form>
        </div>
      );
    }
  };
}

export default Secure;
