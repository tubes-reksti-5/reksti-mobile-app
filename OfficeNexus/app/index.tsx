import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSession } from '../components/ctx';
import { Image } from 'react-native';
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const screenWidth = 360;
const screenHeight = 800;

export default function SignIn() {
  const {signIn,signOut,userData,userEmail,isLoading} = useSession()
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');
  
  const handleSignIn = async () => {
    signIn(email, password)
  };

  useEffect( () => {
    if(userData != null) {
        
    }
  }, [userData])


  return (
    <View style={ styles.layout }>
        <View style={{ gap: 50 }}>
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <Image source={require("@/assets/images/logo.webp")} style={{width: 110, height: 110 }}/>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
                    <Text style={{ fontSize: 32, color: '#444444' }}>
                        Welcome
                    </Text>
                    <Text style={{ fontSize: 32, color: '#444444' }}>
                        Back
                    </Text>
                </View>
            </View>
            <View style={{ gap: 15 }}>
                <TextInput
                    style={ styles.inputContainer }
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={ styles.inputContainer }
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
        </View>
        
        
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <View  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}> 
            <TouchableOpacity onPress={handleSignIn} disabled={isSigningIn}>
                <View style={styles.button}>
                    <Text style={[ styles.text, { fontSize: 16, fontWeight: 'bold', color: 'white' }]}>
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    layout: {
        width: screenWidth,
        height: screenHeight,
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingVertical: screenWidth * (100/360)
    },
    selected: {
        padding: 0,
        width: screenWidth * (320/360),
        height: screenWidth * (405/360),
        borderWidth: 3,
        borderRadius: 16,
        borderColor: '#E1E1E1',
        flexDirection: 'column',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: screenWidth * (280/360),
        height: screenWidth * (50/360),
        gap: screenWidth * (15/360),
        marginLeft: screenWidth * (15/360),
        marginVertical: screenWidth * (7.5/360),
    },
    topContainerRight: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 7,
    },
    bottomContainer: {
        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: screenWidth * (320/360),
    },
    divider: {
        height: screenWidth * (2/360),
        width: screenWidth * (300/360),
        backgroundColor: '#E1E1E1',
        marginBottom: screenWidth * (10/360),
    },
    formContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: screenWidth * (190/360),
    },
    text: {
        // fontFamily: 'inter',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenWidth * (56/360),
        width: screenWidth * (300/360),
        borderWidth: 2,
        borderRadius: 16,
        borderColor: '#444444',
        paddingHorizontal: 25,
        paddingVertical: 20
    },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenWidth * (56/360),
        width: screenWidth * (300/360),
        borderWidth: 2,
        borderRadius: 16,
        borderColor: '#444444',
        backgroundColor: '#444444'
    },
      subtextBoldBlack:{
        fontSize: 16,
        textAlign: "center",
        color: '#444444',
      },
});
