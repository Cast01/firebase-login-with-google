import { createContext, useState, ReactNode, useEffect } from "react";

import { firebase, auth } from '../services/firebase';
import { signOut, getAuth } from 'firebase/auth';

type AuthContextType = {
  user: userType | undefined,
  signInWithGoogle: () => Promise<void>,
  signOutWithGoogle: () => void,
}

type AuthContextProviderProps = {
  children: ReactNode,
}

type userType = {
  name: string,
  avatar: string,
  id: string,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [ user, setUser ] = useState<userType>(() => {
    const storagedSession = localStorage.getItem('respUserKey')
  
    if(storagedSession) {
      const session = JSON.parse(storagedSession)
      return session
    }
  
    return null
  });
  console.log(user);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const resp = await auth.signInWithPopup(provider);

    if (resp.user) {
      const { displayName, photoURL, uid } = resp.user;
      
      if (!displayName || !photoURL) {
        throw new Error('Missing informations from your Google Account.');
      }

      const teste = {
        name: displayName,
        avatar: photoURL,
        id: uid,
      }
      localStorage.setItem('respUserKey', JSON.stringify(teste));

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid,
      });
    }
  }

  function signOutWithGoogle() {
    signOut(getAuth()).then(r => {
      console.log('Desconectado!');
      localStorage.removeItem('respUserKey');
      window.location.href = '/';
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        const { displayName, photoURL, uid } = user;
        
        if (!displayName || !photoURL) {
          throw new Error('Missing informations from your Google Account.');
        }
  
        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid,
        });
        // console.log(user);
      }
    })
    return(() => {
      unsubscribe();
    })
  }, []);

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}