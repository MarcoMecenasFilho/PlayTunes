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

  handleChange = ({ target }) => {
    this.setState({
      nameSearch: target.value,
      artistName: target.value,
    });
  };

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
      </div>
    );
  }
}

export default Search;
