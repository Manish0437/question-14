import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMessage: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    const {isError} = this.state
    if (!isError) {
      history.replace('/')
    }
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username.trim() === '' && password.trim() === '' || username.trim() === '' || password.trim() === '') {
      this.setState({
        isError: true,
        errorMessage: `*Username and Password didn't match`,
      })
      return
    }

    if (username.trim() === '') {
      this.setState({isError: true, errorMessage: 'Username is not found'})
      return
    }

    if (password.trim() === '') {
      this.setState({isError: true, errorMessage: 'Password is not found'})
      return
    }

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error_msg)
      }
      this.setState({isError: false, errorMessage: ''})
      this.onSubmitSuccess()
    } catch (error) {
      this.setState({isError: true, errorMessage: error.message})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {isError, errorMessage} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isError ? <p className="error-msg">{errorMessage}</p> : null}
        </form>
      </div>
    )
  }
}

export default LoginForm
