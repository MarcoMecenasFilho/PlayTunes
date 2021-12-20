import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  }

  newUser = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    createUser({ name })
      .then(() => this.setState({ loading: false, redirect: true }));
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLet = 3;
    if (loading === true) return <Loading />;
    if (redirect === true) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="login-page">
        <img src={ logo } alt="logo" />
        <form>
          <input
            type="text"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.handleChange }
            placeholder="Nome"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < minLet }
            onClick={ this.newUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
