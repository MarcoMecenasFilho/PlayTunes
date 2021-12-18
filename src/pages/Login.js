import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';
import logo from '../images/logo.png';

export default function Login() {
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  handleChange = ({ target }) => {
    setName(target.value);
  };

  newUser = (event) => {
    event.preventDefault();
    setloading(!loading);
    createUser({ name })
      .then(() => {
        setloading(!loading);
        setRedirect(!redirect);
      });
  };

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
          onChange={ handleChange }
          placeholder="Nome"
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ name.length < minLet }
          onClick={ newUser }
        >
          Entrar
        </button>
      </form>
    </div>

  );
}
