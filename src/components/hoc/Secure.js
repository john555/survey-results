import React, { Component } from 'react';

const Secure = (ChildComponent) => {

  return class Chart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        loginError: false,
        password: '',
      };
    }

    handleClick = () => {
      
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
          <div className="login">
            <h1 className="login__title">Password</h1>
            <div className="login__group">
              <input
                type="password"
                className={`login__input ${ this.state.loginError ? 'login__input--error' : '' }`}
                placeholder="✴✴✴✴✴✴"
                value={this.state.password}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
              />
            </div>

            { this.renderErrorMessage() }

            <div className="login__group login__group--buttonGroup">
              <button className="login__button" onClick={this.handleClick}>Sign in</button>
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Secure;
