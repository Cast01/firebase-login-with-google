import { createContext, useState, useEffect, ReactNode } from "react"

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
  id: string,
  email: string,
}

export const AuthContext = createContext({} as AuthContextT);

export function AuthContextProvider(props: AuthContextProviderP) {
  const [user, setUser] = useState<userT>(() => {
    const userStorageObjGet = localStorage.getItem('userStorageKey');

    if (userStorageObjGet) {
      const userStorageObjParse = JSON.parse(userStorageObjGet);
      return userStorageObjParse
    }

    return null
  });
  console.log(user)

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resp = await auth.signInWithPopup(provider);

    if (resp.user) {
      const { displayName, photoURL, uid, email } = resp.user;

      if (!displayName || !photoURL || !email) {
        throw new Error('Missing informations from your google account.');
      }

      let userStorageObj = {
        name: displayName,
        avatar: photoURL,
        id: uid,
        email: email
      }
      localStorage.setItem('userStorageKey', JSON.stringify(userStorageObj));

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid,
        email: email,
      });
    }
  }

  function signOutGoogle() {
    let auth = getAuth();
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
          throw new Error('Missing informations from your google account.');
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
    })
  }, []);

  return(
    <AuthContext.Provider value={{user, signInWithGoogle, signOutGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}