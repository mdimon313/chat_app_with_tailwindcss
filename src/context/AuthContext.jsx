import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../component/Loading";
import { auth } from "../firebase";

const authContext = React.createContext();

// use context
export function useAuth() {
  return useContext(authContext);
}

// provider
export function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  //   signup
  async function signup(email, password, userName) {
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    const user = auth.currentUser;

    setCurrentUser({ ...user });
  }

  //   login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // signout
  async function logout() {
    await signOut(auth);
  }

  if (loading) {
    return <Loading />;
  }

  const vlaues = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <authContext.Provider value={vlaues}>
      {!loading && children}
    </authContext.Provider>
  );
}
