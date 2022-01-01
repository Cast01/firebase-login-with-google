import { createContext, useEffect, useState, ReactNode } from 'react';
import { firebase, auth } from '../services/firebase';
import { signOut, getAuth } from 'firebase/auth';

interface AuthContextT {
  user: userT,
  signInWithGoogle: () => Promise<void>,
  signOutGoogle: () => void,
}

interface AuthContextProviderP {
  children: ReactNode,
}

interface userT {
  name: string,
  avatar: string,
  email: string,
  id: string,
}

export const AuthContext = createContext({} as AuthContextT);

export function AuthContextProvider(props: AuthContextProviderP) {
  const [user,setUser] = useState<userT>(() => {
    const userStorageGet = localStorage.getItem('userStorageKey');

    if (userStorageGet) {
      const userStorageParse = JSON.parse(userStorageGet);
      return userStorageParse;
    }

    return null;
  });
  console.log(user)

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resp = await auth.signInWithPopup(provider);

    if (resp.user) {
      const { displayName, photoURL, email, uid } = resp.user;

      if (!displayName || !photoURL || !email) {
        alert('Erro: Nome, foto ou email não encontrado.');
        window.location.href = '/';
        throw new Error();
      }

      const userStorageSet = {
        name: displayName,
        avatar: photoURL,
        email: email,
        id: uid,
      }
      localStorage.setItem('userStorageKey', JSON.stringify(userStorageSet));

      setUser({
        name: displayName,
        avatar: photoURL,
        email: email,
        id: uid,
      });
    }
  }

  function signOutGoogle() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('userStorageKey');
      window.location.href = '/';
      alert('Para desconectar clique em OK.')
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;
  
        if (!displayName || !photoURL || !email) {
          alert('Erro: Nome, foto ou email não encontrado.');
          window.location.href = '/';
          throw new Error();
        }
  
        setUser({
          name: displayName,
          avatar: photoURL,
          email: email,
          id: uid,
        });
      }
    });
    return(() => {
      unsubscribe();
    });
  }, []);

  return(
    <AuthContext.Provider value={{user,signInWithGoogle,signOutGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}