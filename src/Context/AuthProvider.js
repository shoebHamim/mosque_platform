import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import {app} from '../firebase/firebase.init.js'

export const AuthContext =createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const [role,setRole]=useState('unregistered');
  const googleProvider = new GoogleAuthProvider()
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>unsubscribe
  },[])
  
  const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  const updateUser=(userInfo)=>{
    return updateProfile(auth.currentUser,userInfo)
  } 
  const logOut=()=>{
    setLoading(true)
    return signOut(auth)
  }

  const signInWithGoogle=()=>{
    return signInWithPopup(auth,googleProvider)
  }





  const authInfo={createUser,signIn,user,logOut,updateUser,loading,signInWithGoogle,role,setRole}
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;