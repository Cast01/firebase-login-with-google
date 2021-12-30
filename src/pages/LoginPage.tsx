import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

import '../styles/loginPage.css';

export function LoginPage() {
  const { user, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/userProfile')
  }

  return(
    <div className="container">
      <div>LOGIN</div>
      <button onClick={handleLogin}>Entrar com o Google</button>
    </div>
  )
}