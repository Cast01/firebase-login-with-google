import { useAuth } from '../hooks/useAuth';
import '../styles/loginPage.css';

import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { user, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/userProfile');
  }

  return(
    <div className="container">
      <h1 className="title">
        LOGIN
      </h1>
      <button onClick={handleLogin}>Entrar com o Google</button>
    </div>
  );
}