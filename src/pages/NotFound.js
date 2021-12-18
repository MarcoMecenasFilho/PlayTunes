import React from 'react';
import './NotFound.css';
import logo from '../images/logo.png';
import mob from '../images/mob.gif';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not">
        <img src={ logo } alt="logo" />
        <div>
          <img src={ mob } alt="mob" />
          <h2>A página que você está procurando não foi encontrada.</h2>
        </div>
      </div>
    );
  }
}

export default NotFound;
