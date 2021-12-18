import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logowhite from '../images/logowhite.png';
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
  /* Utilizamos a getUser dentro do componentDidMount ,pois precisamos
  que ela seja rodada assim que o componente é constuido, então quando renderizamos
  um componente, como por exemplo o search, apos a renderização e chamada o getUser
  recuperando o nome preenchido no forms la no login, e inserido no Header e dizemos
  que loading e false para parar de renderizar. */

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
        <img src={ logowhite } alt="logo" />
        {/* cuidado ao usar template literal, utilizei no name, para deixar mais bonito
        e o test não estava achando la no requesito 13, pois ele procurava uma palavra
        especifica, e com o template não ocorria */}
        <p data-testid="header-user-name">{name}</p>
      </div>
    );
    return (
      <header data-testid="header-component" className="header">
        <article>
          {/* Utilizamos um ternario bem simples. se Loading for true
          renderiza Loading, se for false, renderiza o P com o nome do
          usuario */}

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
