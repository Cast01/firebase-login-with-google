import { useAuth } from '../hooks/useAuth';
import '../styles/login-page.css';

export function LoginPage() {
  const { user, signInWithGoogle } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    window.location.href = '/userPage';
  }

  return(
    <main>
      <h1 className="title">LOGIN</h1>
      <button onClick={handleLogin}>Entrar com o Google</button>
    </main>
  );
}