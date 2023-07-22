// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from '@expo/vector-icons';
// import Logout from './Logout';
// import Help from './Help';

// const ScreenOne = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Settings</Text>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="settings-outline" size={20} color="#555" style={styles.icon} />
//           <Text style={styles.sectionHeaderText}>General</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <Text style={styles.sectionText}>Content of the General section</Text>
//           <Ionicons name="chevron-forward-outline" size={20} color="#555" style={styles.icon} onPress={() => navigation.navigate('ScreenTwo')} />
//         </View>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="help-circle-outline" size={20} color="#555" style={styles.icon} />
//           <Text style={styles.sectionHeaderText}>Help</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <Text style={styles.sectionText}>Content of the Help section</Text>
//           <Ionicons name="chevron-forward-outline" size={20} color="#555" style={styles.icon} onPress={() => navigation.navigate('Help')} />
//         </View>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name="log-out-outline" size={20} color="#555" style={styles.icon} />
//           <Text style={styles.sectionHeaderText}>Logout</Text>
//         </View>
//         <View style={styles.sectionContent}>
//           <Text style={styles.sectionText}>Click to logout</Text>
//           <Ionicons name="chevron-forward-outline" size={20} color="#555" style={styles.icon} onPress={() => navigation.navigate('Logout')} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const ScreenTwo = () => {
//   return (
//     // Content of the second screen
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Ionicons name="chevron-back-outline" size={30} color="#555" style={styles.icon} />
//         <Text style={styles.headerText}>Screen Two</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.contentText}>Content of Screen Two</Text>
//       </View>
//     </View>
//   );
// }

// const Settings = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Settings" component={ScreenOne} options={{ headerShown: false }} />
//       <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{ headerShown: false }} />
//       <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
//       <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
 
//     headerText: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginLeft: 10,
//     },
//     section: {
//       marginTop: 20,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ddd',
//       paddingBottom: 20,
//     },
//     sectionHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     sectionHeaderText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       marginLeft: 10,
//     },
//     sectionContent: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginTop: 10,
//     },
//     sectionText: {
//       fontSize: 14,
//       color: '#555',
//     },
//     icon: {
//       marginRight: 10,
//     },
//     content: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     contentText: {
//       fontSize: 24,
//     },
//   });
// export default Settings

// {/* <Image style={styles.image} source={require('./cali_eqipu.jpg')} /> */}