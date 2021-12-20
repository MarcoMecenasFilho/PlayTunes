import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import PLAY from '../images/PLAY.gif';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        name: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    const headerChild = (
      <div className="header-child">
        <Link to="/">
          <img src={ PLAY } alt="logo" />
        </Link>
        <p data-testid="header-user-name">
          Usuário:
          {' '}
          {name}
        </p>
      </div>
    );
    return (
      <header data-testid="header-component" className="header">
        <article>

          {loading ? <Loading /> : headerChild}
        </article>
        <nav className="nav-links">
          <Link className="a-1" to="/search" data-testid="link-to-search">Search</Link>
          <Link
            className="a-2"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link className="a-2" to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
