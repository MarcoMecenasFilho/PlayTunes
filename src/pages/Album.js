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

  /* Grande parte da lógica utilizada , foi reptida da utilizana;
  na pages/searches, então as explicações e referências utilizadas lá
  servem para cá também */

  componentDidMount() {
    this.searchMusicsAlbum();
    this.getfavotire();
  }

  /* devemos utilizar a func() searchMusicsAlbum no componentDidMount, pois
  deve ser executada depois o constructor, render pois a pagina já tera os
  componentes iniciais necessarios para renderizar as faixas. a getfavorite
  deve ser chamada aqui, pois toda vez que a pagina é renderizada a lista de
  musicas favoritas deve ser recuperada e atualizada.  */

  getfavotire = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusics: favorites,
    });
  }
  /* A função getFavorite() recupera as musicas que foram marcadas como
  favorita clicando em seu checkbox, quando ela é chamada diz que o state
  loading é true e assim renderiza o carregamento, e como é assincrona pede
  para esperar a favorites terminar, apos finalizar, o  loading para de ser
  renderizado e o valor recebida da getFavoriteSongs é passado como valor para
  chave favoriteMusics do state e */

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
  /* a fun() favoriteMusics acessa o state favoriteMusics, e joga ele
  em um some, dizendo que se algum trackId de uma musica favorita for igual
  ao trackId da uma  musica da lista, retorna um true, lembrando que a  função
  favoriteMusics recebe um music como parametro. Caso seja true, essa musica é
  removida da lista, caso não faça parte da favoriteMusics, ela é adicionada
  e no final é sempre chamado o getfavorite para atualizar a lista de musicas
  favoritas */

  searchMusicsAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);

    this.setState({
      loading: false,
      musicList: musics,
    });
  }
  /* a func() searchMusicsAlbum é async pois ela recebe a função getMusics que
  é um request para receber as faixas daquele album, conseguimos recuparar o id
  do album pelo id passado la no seach, quando clicamos no album que questão somos
  redirecionados para a pagina album/id, então capturamos esse id utilizando
  match.params.id, isso é possivel, pois la no ROute passamos ...pros como props
  do component search. Quando esse requisição é concluida o state loading para de ser
  renderizado e o state musiList recebe o array Musics como valor, sendo esse musics
  o array recebido da requisição. */

  resultMusicsAlbum = () => {
    const { musicList, favoriteMusics } = this.state;
    return (
      <section className="album">
        {console.log(musicList)}
        {/* Quando faço o console log, é possivel ver o array que recebo,
        sendo o primeiro indice, onde possue as infoirmações como id, nome
        album. Após isso estão as faixas, e é por essa razão que é feito
        um slice do primeiro elemento do array, pois ele sera jogado no map
        e não tocara nada, apenas um player desabilitado, então o excluimos
        e jogamos no maps todo o array, e assim é renderizado as faixas
        pelo component MusicCard. */}
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
              /* para o checked ser true, o treckId do song deve
              ser igual a do music, pois estando no favorite quer dizer que
              aquela faixa deveria estar checked, se for false, não precisa */
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
