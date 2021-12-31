import { useAuth } from '../hooks/useAuth';
import '../styles/user-profile.css';

export function UserProfile() {
  const { user, signOutGoogle } = useAuth();

  return(
    <div className="container">
      <h1 className="title">MEU PERFIL</h1>
      <img src={user.avatar} alt="Perfil img" />
      <span className="name">Nome: <strong>{user.name}</strong></span>
      <span className="email">Email: <strong>{user.email}</strong></span>
      <button onClick={signOutGoogle}>Desconectar</button>
    </div>
  );
}