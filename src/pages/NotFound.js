import React from 'react';
import './NotFound.css';
import PLAY from '../images/PLAY.gif';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not">
        <img src={ PLAY } alt="logo" />
        <h2>A página que você está procurando não foi encontrada.</h2>

      </div>
    );
  }
}

export default NotFound;
