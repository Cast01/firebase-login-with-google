import { useAuth } from '../hooks/useAuth';
import '../styles/user-page.css';

export function UserPage() {
  const { user, signOutGoogle } = useAuth();

  return(
    <main>
      <h1 className="title">MEU PERFIL</h1>
      <img src={user.avatar} alt="" />
      <span className="name">Nome: <strong>{user.name}</strong></span>
      <span className="email">Email: <strong>{user.email}</strong></span>
      <button onClick={signOutGoogle}>Desconectar</button>
    </main>
  );
}