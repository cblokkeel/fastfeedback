import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signinWithGithub = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
      .then(({ user }) => {
        setUser(user);
        return user;
      })
      .catch((err) => console.error(err));
  };

  const signout = () => {
    const auth = getAuth();
    return signOut(auth)
      .then(setUser(false))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}
