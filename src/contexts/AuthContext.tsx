import { createContext, useState, ReactNode, useEffect } from 'react';

import { firebase, auth } from '../services/firebase';
import { signOut, getAuth } from 'firebase/auth';

type AuthContextType = {
  user: userType | undefined,
  signInWithGoogle: () => Promise<void>,
  logOutGoogle: () => void,
}

type userType = {
  name: string | null,
  avatar: string | null,
  id: string,
}

type AuthContextProviderProps = {
  children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<userType>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid,
      })

      if (!displayName || photoURL) {
        throw new Error('Missing information from Google Account.')
      }
    }
  }

  function logOutGoogle() {
    signOut(getAuth()).then(r => {
      console.log('Desconectado!');
      window.location.reload();
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
  
        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid,
        })
  
        if (!displayName || photoURL) {
          throw new Error('Missing information from Google Account.')
        }
      }
    });
    return(() => {
      unsubscribe();
    })
  }, []);

  return(
    <AuthContext.Provider value={{user, signInWithGoogle, logOutGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}