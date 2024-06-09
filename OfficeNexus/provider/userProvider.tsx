import { View, Text } from 'react-native'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { supabase } from '@/utils/supabase';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    
    const [session, setSession] = useState(null);
    const [authLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const getSession = async () => {
        setLoading(true)
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session: ", error);
          setLoading(false);
        } else {
            setSession(data.session);
            
            setLoading(false);
          }

        
      }
    const updateUserData = async () => {
      if (session != null) {
        setLoading(true)
        console.log(session.user.id)
        const {data : fetchUserData, error} = await  supabase.from("User").select("*").eq("id_user", session.user.id).single()
        if (error) {
        console.log(error)
        setLoading(false);
        } else {
            setUserData(fetchUserData)
            setLoading(false);
            console.log(fetchUserData)
        }
      }
    }
    const value = {
        session,
        authLoading,
        userData,
        getSession,
        updateUserData
    }
    useEffect(() => {updateUserData()}, [session])
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth }