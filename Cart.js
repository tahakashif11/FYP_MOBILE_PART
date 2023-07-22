import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homess from "./screens/Homess";
import MyCart from "./screens/MyCart";
import ProductInfo from "./screens/ProductInfo";
import PaymentScreen from "./screens/PaymentScreen";
import Elsee from "./Elsee";
const Cart = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homess" component={Homess} options={{ headerShown: false }} />
      <Stack.Screen name="MyCart" component={MyCart} options={{ headerShown: false }} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen options={{ headerShown: false }} name="Elsee" component={Elsee} />
    </Stack.Navigator>

  );
};

export default Cart;

const styles = StyleSheet.create({});
