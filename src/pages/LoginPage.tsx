import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/login-page.css';

export function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleLoginWithGoogle() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/userProfile');
  }

  return(
    <div className="container">
      <h1 className="title">LOGIN</h1>
      <button onClick={handleLoginWithGoogle}>Entrar com o Google</button>
    </div>
  );
}