import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const {
      album: {
        collectionId,
        artworkUrl100,
        collectionName,
        artistName },
    } = this.props;

    return (
      <Link
        className="link-card"
        to={ `/album/${collectionId} ` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <article className="album-card">
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
          />
          <h2>{collectionName}</h2>
          <p>{artistName}</p>
        </article>
      </Link>

    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
