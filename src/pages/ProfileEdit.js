import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import './ProfileEdit.css';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = ({
      loading: false,
      name: '',
      description: 'Lorem ipsum',
      email: 'usuario@usuario.com',
      image: 'https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png',
      redirect: false,
    });
  }

  /* Grande parte da loógica foi usado no search, profile e login, suas explicações e
  referencias valem para cá */

  componentDidMount() {
    this.getInfoUser();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  getInfoUser = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      loading: false,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
    });
  }

  saveInfoUser = async () => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    const user = {
      name,
      email,
      image,
      description,
    };
    await updateUser(user);
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, image, description, loading, redirect } = this.state;
    const buttonOn = (name.length > 0
      && email.length > 0 && image.length > 0 && description.length > 0);

    /* acessado para fazer a lógica  do button
        https://github.com/tryber/sd-014-b-project-trybetunes/
         blob/Ana-Alice-Honorio-TrybeTunes/src/pages/ProfileEdit.js */

    const formsUser = (
      <div className="form-edit">
        <form>
          <div className="img-info">
            <img src={ image } alt="foto" />
            <input
              type="text"
              value={ image }
              data-testid="edit-input-image"
              name="image"
              placeholder="url da imagem"
              onChange={ this.handleChange }
            />
          </div>
          <input
            type="text"
            value={ name }
            data-testid="edit-input-name"
            name="name"
            onChange={ this.handleChange }
            placeholder="nome"
          />
          <input
            type="email"
            value={ email }
            data-testid="edit-input-email"
            name="email"
            onChange={ this.handleChange }
            placeholder="email"
          />
          <textarea
            value={ description }
            data-testid="edit-input-description"
            name="description"
            onChange={ this.handleChange }
            placeholder="Bio"
          />
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ !buttonOn }
            onClick={ this.saveInfoUser }
          >
            Salvar
          </button>
        </form>
      </div>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : formsUser }
        {redirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
