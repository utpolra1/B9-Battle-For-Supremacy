
import React, { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import App from "./firebase.config";
import axios from "axios";

export const authContext = createContext(null);

const provider = new GoogleAuthProvider();
const auth = getAuth(App);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setuser] = useState(null);

  // save user
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      photo:user?.photoURL,
      role: 'guest',
      status: 'Verified',
      paid:'Unpaid'
    };
    try {
      const { data } = await axios.put('http://localhost:5000/user', currentUser);
      return data;
    } catch (error) {
      console.error('Error saving user:', error);
      // Handle error appropriately
    }
  };

  // onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setuser(currentUser);
      if (currentUser) {
        await saveUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const googleLogin=()=>{
    return signInWithPopup(auth, provider)
  }

  const updateProfilec=(name,photo)=>{
    return updateProfile (auth.currentUser, {
      displayName: name, photoURL: photo
    })
  }

  const login=(email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logout =()=>{
    return signOut(auth)
  }

  const AuthInfo = {
    user,
    createUser,
    updateProfilec,
    login,
    googleLogin,
    logout,
    loading
    };
  return (
    <div>
      <authContext.Provider value={AuthInfo} >{children}</authContext.Provider>
    </div>
  );
};

export default AuthProvider;
