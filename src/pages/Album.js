import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musicList: [],
      favoriteMusics: [],

    };
  }

  componentDidMount() {
    this.searchMusicsAlbum();
    this.getfavotire();
  }

  getfavotire = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusics: favorites,
    });
  }

  favoriteMusics = (music) => {
    const { favoriteMusics } = this.state;
    const favorite = favoriteMusics.some((song) => song.trackId === music.trackId);
    if (favorite) {
      removeSong(music);
    } else {
      addSong(music);
    }
    this.getfavotire();
  }

  searchMusicsAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    try {
      const musics = await getMusics(id);
      this.setState({
        loading: false,
        musicList: musics,
      });
    } catch (error) {
      alert('Erro com a API, recarregue a página por favor!');
    }
  }

  resultMusicsAlbum = () => {
    const { musicList, favoriteMusics } = this.state;
    return (
      <section className="album">
        {console.log(musicList)}
        <div className="info-album">
          <img src={ musicList[0].artworkUrl100 } alt="album" />
          <h2 data-testid="album-name">{musicList[0].collectionName}</h2>
          <h3 data-testid="artist-name">{musicList[0].artistName}</h3>
        </div>
        <div className="track-album">
          {musicList.slice(1).map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              checked={ favoriteMusics.some((song) => song.trackId === music.trackId) }
              favoriteMusics={ () => this.favoriteMusics(music) }
            />
          ))}
        </div>
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.resultMusicsAlbum() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
