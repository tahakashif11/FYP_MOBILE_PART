import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ChatBot = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [btnStatus, setBtnStatus] = useState(false);
  const [btnLabel, setBtnLabel] = useState('Send Message');
  const [res, setRes] = useState('');

  const sendRequest = async () => {
    setBtnStatus(true);
    setBtnLabel('Processing');
    const url = 'https://chatgpt53.p.rapidapi.com/';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'ca0f64bc1cmsh1fec2863266251dp158d28jsnf749b29a5f20',
        'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `${prompt} (in the context of Fitness. If it is not related to a photo editor, please mention that it's out of the context of Fitness)`
          }
        ]
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMessage(result.choices[0].message.content);
      setBtnLabel('Send Message');
      setBtnStatus(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#141e26', '#141e26']}
      style={styles.linearGradient1}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
          <View style={styles.container2}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Answer"
              placeholderTextColor="#d5bafe"
              style={styles.input}
              multiline={true}
            />
          </View>
          <View style={styles.container1}>
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Enter your query"
              placeholderTextColor="#d5bafe"
              style={styles.input}
              multiline={true}
            />
          </View>
          <TouchableOpacity disabled={btnStatus} onPress={sendRequest}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#d5bafe', '#d5bafe']}
              style={styles.linearGradient}
            >
              <Text style={styles.buttonTextStyle}>{btnLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.responseText}>{res}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient1: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1
  },
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10
  },
  container1: {
    backgroundColor: '#212b35',
    width: '100%',
    height: 100,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  container2: {
    backgroundColor: '#212b35',
    width: '100%',
    height: 200,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  input: {
    color: '#d5bafe',
    flex: 1
  },
  linearGradient: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 16
  },
  responseText: {
    color: 'white',
    marginTop: 20
  }
});

export default ChatBot;
