import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

import '../styles/pageOne.css';

export function PageTwo() {
  const { signInWithGoogle, user, logOutGoogle } = useAuth();

  const navigate = useNavigate();

  function login() {
    if (!user) {
      signInWithGoogle();
    }
    navigate('/pageTwo');
  }

  function toPageOne() {
    navigate('/');
  }

  return(
    <div className="container">
      <h1>Página 2</h1>
      <span>Olá, {user?.name}</span>
      <div className="bts">
        <button onClick={login}>Google login</button>
        <button onClick={toPageOne}>página 1</button>
        <button onClick={logOutGoogle}>Desconectar</button>
      </div>
    </div>
  )
}