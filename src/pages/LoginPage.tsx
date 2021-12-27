import '../styles/loginPage.css';

import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { user, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  async function handlerLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/userProfile');
  }

  return(
    <div className="container">
      <h1>Login</h1>
      <button onClick={handlerLogin}>Google Login</button>
    </div>
  )
}