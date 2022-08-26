import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createUser } from "@/lib/db";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    const user = rawUser ? formatUser(rawUser) : false;
    if (user) createUser(user.uid, user);
    setUser(user);
    return user;
  };

  const formatUser = ({ uid, email, displayName, providerData, photoURL }) => {
    return {
      uid,
      email,
      name: displayName,
      provider: providerData[0].providerId,
      photoUrl: photoURL,
    };
  };

  const signinWithGithub = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
      .then(({ user }) => {
        handleUser(user);
      })
      .catch((err) => console.error(err));
  };

  const signout = () => {
    const auth = getAuth();
    return signOut(auth)
      .then(handleUser(false))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}
