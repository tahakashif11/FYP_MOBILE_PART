import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@firebase/auth';
import { auth, db, doc, setDoc, addDoc, getDocs } from '../firebase';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('MyDashboard');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Registered with:', user.email);
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", user.uid);

        setDoc(userRef, {
          email: user.email,
          name: name,

        });




        // Get a reference to the current user's document in the "users" collection


        // Retrieve the user's data from Firestore

      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert("Wrong Email or Password"));
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} >
      <MaterialCommunityIcons
        name="jump-rope"
        size={60}
        color="green"
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setname(text)}
          style={styles.input}

        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity
          onPress={handleForgotPassword}

          style={styles.forgotPasswordButton}
        >
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#57b846',
    padding: 15,
    width: '45%',
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#57b846'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  },
  buttonOutlineText: {
    color: '#57b846',
    fontWeight: '700',
    textAlign: 'center'
  },
  forgotPasswordButton: {

    marginTop: 20,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderWidth: 1,
    paddingBottom: 5,
  },
  forgotPasswordButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default LoginScreen;
