import { createContext, useEffect, useState, ReactNode } from 'react';
import { firebase, auth } from '../services/firebase';
import { signOut, getAuth } from  'firebase/auth';

interface AuthContextT {
  user: userT,
  signInWithGoogle:() => Promise<void>,
  signOutGoogle: () => void,
}

interface AuthContextProviderP {
  children: ReactNode,
}

interface userT {
  name:string,
  avatar:string,
  id: string,
  email: string,
}

export const AuthContext = createContext({} as AuthContextT);

export function  AuthContextProvider(props: AuthContextProviderP) {
  const [user, setUser] = useState<userT>(() => {
    let userStorageGet = localStorage.getItem('userStorageKey');

    if (userStorageGet) {
      const userStorageParse = JSON.parse(userStorageGet);
      return userStorageParse;
    }

    return null
  });
  console.log(user)

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resp = await auth.signInWithPopup(provider);

    if (resp.user) {
      const {displayName,photoURL,uid,email} = resp.user;

      if (!displayName || !photoURL || !email) {
        alert('Seu nome ou sua foto de perfil não foi encontrado');
        throw new Error();
      }

      let userStorageSet = {
        name: displayName,
        avatar: photoURL,
        id: uid,
        email: email,
      }
      localStorage.setItem('userStorageKey', JSON.stringify(userStorageSet));

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid,
        email: email,
      });
    }
  }

  function signOutGoogle() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('userStorageKey');
      window.location.href = '/';
      alert('Desconectado');
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const {displayName,photoURL,uid,email} = user;

        if (!displayName || !photoURL || !email) {
          alert('Seu nome ou sua foto de perfil não foi encontrado');
          throw new Error();
        }
  
        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid,
          email: email,
        });
      }
    });
    return(() => {
      alert('Evento interrompido.');
      unsubscribe();
    });
  }, []);

  return(
    <AuthContext.Provider value={{user,signInWithGoogle,signOutGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}