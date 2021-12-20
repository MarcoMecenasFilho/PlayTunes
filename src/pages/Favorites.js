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

  componentDidMount() {
    this.getfavoriteSongs();
  }

  getfavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteTracks = await getFavoriteSongs();
    console.log(favoriteTracks);
    this.setState({
      loading: false,
      favoriteSongs: favoriteTracks,
    });
  };

  handleFavorite = (music) => {
    if (music) {
      removeSong(music);
    }
    this.getfavoriteSongs();
  }

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
