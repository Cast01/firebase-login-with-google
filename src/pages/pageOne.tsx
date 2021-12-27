import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

import '../styles/pageOne.css';

export function PageOne() {
  const { signInWithGoogle, user, logOutGoogle } = useAuth();

  const navigate = useNavigate();

  function login() {
    if (!user) {
      signInWithGoogle();
    }
    navigate('/');
  }

  function toPageTwo() {
    navigate('/pageTwo');
  }

  return(
    <div className="container">
      <h1>Página 1</h1>
      <span>Olá, {user?.name}</span>
      <div className="bts">
        <button onClick={login}>Google login</button>
        <button onClick={toPageTwo}>página 2</button>
        <button onClick={logOutGoogle}>Desconectar</button>
      </div>
    </div>
  )
}