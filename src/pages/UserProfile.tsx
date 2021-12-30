import boxIconLogOut from '../assets/images/bx-log-out.svg';
import { useAuth } from '../hooks/useAuth';

export function UserProfile() {
  const { user, signOutGoogle } = useAuth();

  return(
    <div className="container">
      <div>Meu perfil</div>
      <span className="boxicon">
        <img src={boxIconLogOut} alt="Icon logout" className="boxicon-logOut" onClick={signOutGoogle} />
        </span>
      <img src={user?.avatar} alt="Peril" className="perfil-img" />
      <span className="name">Nome: <strong>{user?.name}</strong></span>
      <span className="email">email: <strong>{user?.email}</strong></span>
    </div>
  )
}