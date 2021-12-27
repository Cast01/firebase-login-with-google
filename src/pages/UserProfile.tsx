import '../styles/loginPage.css';

import { useAuth } from '../hooks/useAuth';

import boxIcon from '../images/bx-log-out.svg';

export function UserProfile() {
  const { user, signOutWithGoogle } = useAuth();

  return(
    <div className="container">
      <img onClick={signOutWithGoogle} className='box-icon' src={boxIcon} alt="Icone de logout" title="Sair" />
      <img className='perfilImg' src={user?.avatar} alt="Perfil" />
      <span className="name">
        Olá, {user?.name}
      </span>
    </div>
  )
}