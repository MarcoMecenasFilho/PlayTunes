import React from 'react';
import Header from '../components/Header';
import './Search.css';
import Loading from './Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameSearch: '',
      loading: false,
      artistName: '',
      albumsFound: [],
      validation: false,
    };
    this.resultsAlbums = this.resultsAlbums.bind(this);
  }

  /*  Parte da lógica utilizada aqui, foi a mesma do arquivo Login.js, todas
as justificativas e referências de lá servem para aqui */
  handleChange = ({ target }) => {
    this.setState({
      nameSearch: target.value,
      artistName: target.value,
    });
  };
  /* O state Validation foi criado para renderizar ou não os albums, ele inicia como false e assim que o search album executa a requisição e retorna algo, ou seja a requisição foi feita sucesso, ele passa para true, e assim é chamado
  a função resultAlbum, que renderiza o album caso seja encontrado ou a mensagem que nada foi encontrado com aquele nome */

  searchAlbum = async (event) => {
    event.preventDefault();
    const { nameSearch } = this.state;
    this.setState({ loading: true });
    const foundAlbums = await searchAlbumsAPI(nameSearch);

    this.setState({
      nameSearch: '',
      loading: false,
      albumsFound: foundAlbums,
      artistName: nameSearch,
      validation: true,
    });
  };

  /* Na função searchAlbum, buscamos a informações na API, sendo que ela retorna
  uma promise, precisamos fazer essa func() ser async, dizemos que loading é true
  para renderizar o loading, e chamamos a func() searchAlbumsAPI, e dizemos que
  a fun() só continua quando for finalizada, assim modificamos os setstates, dizendo
  loading é false para parar de renderizar e comolamos os albums encontrados dentro
  do state albumsFound, apagamos o nome digitado na barra e salvamos ele no artistName */

  resultsAlbums() {
    const { albumsFound, artistName } = this.state;
    if (albumsFound.length === 0) {
      return (
        <div>
          <h1>{`Resultado de álbuns de: ${artistName}`}</h1>
          <h2>Nenhum álbum foi encontrado</h2>
        </div>
      );
    }
    return (
      <div className="result-card">
        <h1>{`Resultado de álbuns de: ${artistName}`}</h1>
        <section className="albums-cards">
          {albumsFound.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />
          ))}
        </section>
      </div>
    );
  }

  /*  A func() resulAlbuns utiliza o state albumsfound, que foi preenchido
  com os albuns enconrtado, e dizemo se o array for vazio ele retorna a mensagem
  que não encontrou nada, mas caso ache, ele joga esse array, em um map, onde passa
  o objeto de cada album para o componente AlbumCard por props, onde sera renderizado o album */

  render() {
    const { nameSearch, loading, validation } = this.state;
    const minLet = 2;
    return (
      <div data-testid="page-search" className="div-search">
        <Header />
        <form className="search-forms">
          <input
            type="text"
            name="nameSearch"
            value={ nameSearch }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            placeholder="Nome do artista ou banda"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            value="procurar"
            disabled={ nameSearch.length < minLet }
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { validation && this.resultsAlbums() }
        {/* o londing quando é true ele é renderizado, já a validation foi criado
          para "rodar"  a fun() resultAlbums, apenas quando for true. Para isso acontecer
           quando a func searchalbum finaliza a request e retorna o array e muda o state da validation
           para true assim sendo executado a resulalbums, e sendo renderizado
           ou não, dependendo se o resultado da request encontrou algo na api. */}
      </div>
    );
  }
}

export default Search;
