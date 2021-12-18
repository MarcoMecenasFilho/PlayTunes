import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorite.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }
  /* Grande parte da lógica utilizada , foi reptida da utilizana;
  na pages/album, então as explicações e referências utilizadas lá
  servem para cá também */

  componentDidMount() {
    this.getfavoriteSongs();
  }
  /* devemos utilizar a func() getFavoriteSongs no componentDidMount, pois
  deve ser executada depois da constructor e render, pois a pagina já tera os
  componentes iniciais necessarios para renderizar as faixas  favoritas  */

  getfavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteTracks = await getFavoriteSongs();
    console.log(favoriteTracks);
    this.setState({
      loading: false,
      favoriteSongs: favoriteTracks,
    });
  };

  /* A função getFavoriteSongs() recupera as musicas que foram marcadas como
  favorita clicando em seu checkbox, quando ela é chamada diz que o state
  loading é true e assim renderiza o carregamento, e como é assincrona pede
  para esperar a favorites terminar, apos finalizar, o  loading para de ser
  renderizado e o valor recebida da getFavoriteSongs é passado como valor para
  chave favoriteMusics do state e */

  handleFavorite = (music) => {
    if (music) {
      removeSong(music);
    }
    this.getfavoriteSongs();
  }
  /* a fun() handleFavoritos recebe um objeto como parametro, sendo esse objeto do state favoriteSong
  e jogo em um if, caso esse objeto exista ele é excluido quando clicamos no checkbox, e a lista
  deve ser atualizado rodando novamente a função getavoriteSongs */

  favoriteSongsList = () => {
    const { favoriteSongs } = this.state;
    return (
      <section className="music-fav">
        {favoriteSongs.map((music) => (
          <div key={ music.trackId } className="track">
            <img src={ music.artworkUrl100 } alt="capa" />
            <MusicCard
              music={ music }
              favoriteMusics={ () => this.handleFavorite(music) }
              checked={ music.trackId !== undefined }
            />
          </div>
        ))}
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : this.favoriteSongsList() }
      </div>
    );
  }
}

export default Favorites;
