import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      description: 'Minha bio',
      email: 'usuario@usuario.com',
      image: 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

getInfo = async () => {
  this.setState({ loading: true });
  const infos = await getUser();
  this.setState({
    loading: false,
    name: infos.name,
    email: infos.email,
    description: infos.description,
    image: infos.image,
  });
}

resultInfo = () => {
  const { image, email, description, name } = this.state;
  return (
    <div className="user">
      <div className="infos-user">
        <div className="infos-img">
          <img data-testid="profile-image" src={ image } alt="I" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
        <label htmlFor="name-user">
          Nome
          <h2 id="name-user">{name}</h2>
        </label>
        <label htmlFor="email-user">
          E-mail
          <h2 id="email-user">{email}</h2>
        </label>
        <label htmlFor="descrip-user">
          Descrição
          <h2 id="descrip-user">{description}</h2>
        </label>
      </div>
    </div>
  );
}

render() {
  const { loading } = this.state;
  return (
    <div data-testid="page-profile">
      <Header />
      {loading ? <Loading /> : this.resultInfo()}
    </div>
  );
}
}

export default Profile;
