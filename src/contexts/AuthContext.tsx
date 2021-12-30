import { createContext, useEffect, useState, ReactNode } from 'react';

import { firebase, auth } from '../services/firebase';
import { signOut, getAuth } from 'firebase/auth';

type AuthContextT = {
  user: userT | undefined,
  signInWithGoogle: () => Promise<void>,
  signOutGoogle: () => void,
}

type AuthContextProviderP = {
  children: ReactNode,
}

type userT = {
  name: string,
  avatar: string,
  id: string;
  email: string,
}

export const AuthContext = createContext({} as AuthContextT);

export function AuthContextProvider(props: AuthContextProviderP) {
  const [ user, setUser ] = useState<userT>(() => {
    const userStorageGet = localStorage.getItem('userStorageKey');

    if (userStorageGet) {
      const userStorageParse = JSON.parse(userStorageGet);
      return userStorageParse;
    }

    return null
  });

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resp = await auth.signInWithPopup(provider);

    if (resp.user) {
      const { displayName, photoURL, uid, email } = resp.user;

      if (!displayName || !photoURL || !email) {
        throw new Error('Missing informations from your Google Account.');
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
      window.location.href = '/login';
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
  
        if (!displayName || !photoURL || !email) {
          throw new Error('Missing informations from your Google Account.');
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
      unsubscribe();
    });
  }, []);

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}