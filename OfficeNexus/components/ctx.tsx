import React, { useState } from 'react';
import { useStorageState } from './useStorageState';

// Hardcoded user data (replace with API call later)
const userData = {
  email: 'asd',
  password: 'asd',
};

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  userEmail?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
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

  const signIn = (email: string, password: string) => {
    setIsSigningIn(true);

    // Simulate an asynchronous sign-in process
    setTimeout(() => {
      if (email === userData.email && password === userData.password) {
        setUserEmail(email);
      } else {
        alert('Invalid email or password');
      }
      setIsSigningIn(false);
    }, 1000);
  };

  const signOut = () => {
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        userEmail,
        isLoading: isLoading || isSigningIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}