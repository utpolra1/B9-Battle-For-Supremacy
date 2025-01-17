import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import App from "./firebase.config";
import axios from "axios";

export const authContext = createContext(null);

const provider = new GoogleAuthProvider();
const auth = getAuth(App);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState("");

  // save user
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
      role: "guest",
      status: "Verified",
      paid: "Unpaid",
    };
    try {
      const { data } = await axios.put(
        "https://b9-battle-for-supremacy-server.vercel.app/user",
        currentUser
      );
      return data;
    } catch (error) {
      console.error("Error saving user:", error);
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
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const updateProfile = (profile) => {
    if (auth.currentUser) {
      return firebaseUpdateProfile(auth.currentUser, profile);
    }
    return Promise.reject(new Error("No user is signed in"));
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const AuthInfo = {
    user,
    createUser,
    updateProfile,
    login,
    googleLogin,
    logout,
    loading,
  };
  return (
    <div>
      <authContext.Provider value={AuthInfo}>{children}</authContext.Provider>
    </div>
  );
};

export default AuthProvider;
