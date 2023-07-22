import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect ,useRef,useContext} from 'react';
import { DrawerItemList, createDrawerNavigator ,DrawerItem,} from '@react-navigation/drawer';
import { StyleSheet, Text, View, Image, Switch, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Logout from './screens/Logout';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import ChatBot from './screens/ChatBot';
import Chat from './screens/Chat';
import Maps from './screens/Maps';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Cart from './Cart';
import PaymentScreen from './screens/PaymentScreen';
import Videoblogs from './screens/Videoblogs';
import HomeBlog from './screens/HomeBlog';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlogList from './screens/BlogList';
import NotificationScreen from './screens/NotificationScreen';

import { auth } from './firebase'

import { ThemeContext } from './ThemeContext';

function MyDrawer({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const handleLogout = () => {
    // Perform logout logic here
    auth
      .signOut()
      .then(() => {
        // Navigate to the login screen or any other screen after logout
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log('Logout error:', error);
        // Handle error if logout fails
      });
  };

  const styles = isEnabled
    ? {
      drawerContent: {
        backgroundColor: 'black',
        flex: 1,
      },
      drawerHeader: {
        backgroundColor: '#222',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        color: '#fff',
      },
      label: {
        color: '#fff',
      },
    }
    : {
      drawerContent: {
        backgroundColor: '#fff',
        flex: 1,
      },
      drawerHeader: {
        backgroundColor: '#eee',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        color: '#333',
      },
      label: {
        color: '#333',
      },
    };
  return (


    <Drawer.Navigator
      drawerContent={(props) => (
        <View style={styles.drawerContent}>
          <View style={styles.drawerHeader}>
            <MaterialCommunityIcons
              name="dumbbell"
              size={40}
              color="black"

            />


          </View>
          
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            icon={({ color, size }) => <Ionicons name="log-out-outline" color={color} size={size} />}
            onPress={handleLogout}
          />
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginLeft: 10 }}>
            <Ionicons name={isEnabled ? 'ios-moon' : 'ios-sunny'} size={30} style={styles.icon} />
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>


        </View>
      )}
      screenOptions={({ route },) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'ChatBot') {
            iconName = focused ? 'ios-chatbox' : 'ios-chatbox-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          } else if (route.name === 'Logout') {

          //   iconName = focused ? 'ios-log-out' : 'ios-log-out-outline';
          }
          else if (route.name === 'Videoblogs') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle';
          }
          else if (route.name === 'Shop') {
            iconName = focused ? 'ios-cart' : 'ios-cart';
          }
          else if (route.name === 'HomeBlogs') {
            iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
          }
          else if (route.name === 'BlogList') {
            iconName = focused ? 'document-text-outline' : 'document-text-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },


        activeTintColor: '#FFF',
        inactiveTintColor: '#999',
        itemStyle: { marginVertical: 5 },
        labelStyle: { fontSize: 16 },
        style: { backgroundColor: '#4a4a4a' },
      })}
    >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
      <Drawer.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Drawer.Screen name="Map" component={Maps} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} /> */}
      <Drawer.Screen name="Videoblogs" component={Videoblogs} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} /> */}

      <Drawer.Screen name="Shop" component={Cart} options={{ headerShown: false }} />
      <Drawer.Screen name="HomeBlogs" component={HomeBlog} options={{ headerShown: false }} />
      <Drawer.Screen name="BlogList" component={BlogList} options={{ headerShown: false }} />


    </Drawer.Navigator>

  );

}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {
  const [notification, setNotification] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Enable push notifications to use the app!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      const allNotifications = await Notifications.getAllScheduledNotificationsAsync();

      // Save the notifications locally using AsyncStorage
      await AsyncStorage.setItem('notifications', JSON.stringify(allNotifications));

      setNotifications(allNotifications);
    }

    getPermission();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const sendScheduledNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Drink Water ",
          body: "Time for Drinking Water.",
          data: { data: "data goes here" }
        },
        trigger: {
          seconds: 28000
          , // 8 hours in seconds
          repeats: false
        },
        content: {
          title: "Work Hard",
          body: "Time for Workout.",
          data: { data: "data goes here" }
        },
        trigger: {
          seconds: 26000
          , // 8 hours in seconds
          repeats: false
        },
        content: {
          title: "Go out",
          body: "Time for walk.",
          data: { data: "data goes here" }
        },
        trigger: {
          seconds: 26000
          , // 8 hours in seconds
          repeats: false
        },



      });
    }

    sendScheduledNotification();
  }, []);

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MyDashboard" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,

  },
  drawerHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 110,
    backgroundColor: 'white',
    flexDirection: 'row',

  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  drawerSection: {
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },


});
