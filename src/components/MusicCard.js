import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const {
      music: { trackName, previewUrl, trackId }, favoriteMusics, checked } = this.props;
    return (
      <div className="div-card">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            id={ trackId }
            type="checkbox"
            onChange={ favoriteMusics }
            checked={ checked }
          />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoriteMusics: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    artistName: PropTypes.string,
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default MusicCard;
