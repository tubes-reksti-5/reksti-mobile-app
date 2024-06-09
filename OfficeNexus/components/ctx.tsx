import React, { useState } from 'react';
import { useStorageState } from './useStorageState';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
const bcrypt = require('bcryptjs');
// Hardcoded user data (replace with API call later)
const userData = {
  email: 'asd',
  password: 'asd',
};



const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  userData : any;
  userEmail?: string | null;
  isLoading: boolean;
  
}>({
  signIn: () => null,
  signOut: () => null,
  userData : null,
  userEmail: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, userEmail], setUserEmail] = useStorageState('userEmail');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userData, setUserData]= useState(null)

  const signIn = async (email: string, password: string) => {
    setIsSigningIn(true);
    const {data, error} = await supabase.from("User").select("*").eq("email", email ).single()
    if (error) {
      console.log("login_error",error)
      setIsSigningIn(false)
      
    } else if (data == null) {
      setIsSigningIn(false)
      console.log("email does not exist", email)
      
    }
     
    else {
      const isPasswordValid = await bcrypt.compare(password, data.hashed_password);

        if (isPasswordValid) {
          setUserEmail(email);
          setUserData(data);
        } else {
          alert('Invalid email or password');
        }
        setIsSigningIn(false);
        router.replace("/main/")
      ;
    };
    }
    


  const signOut = () => {
    setUserEmail(null);
    router.replace("/")
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        userData,
        userEmail,
        isLoading: isLoading || isSigningIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}