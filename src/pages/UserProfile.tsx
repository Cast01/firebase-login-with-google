import { useAuth } from '../hooks/useAuth';
import '../styles/userProfilePage.css';

export function UserProfile() {
  const { user, signOutGoogle } = useAuth();

  return(
    <div className="container">
      <h1 className='title'>MEU PERFIL</h1>
      <img src={user?.avatar} alt="" />
      <span className="name">nome: <strong>{user?.name }</strong></span>
      <span className="email">email: <strong>{user?.email}</strong></span>
      <button onClick={signOutGoogle}>Desconectar</button>
    </div>
  );
}