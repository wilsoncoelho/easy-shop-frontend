import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from './CheckoutNavigator'

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name={"Cart"}
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Checkout"}
        component={CheckoutNavigator}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default function CartNavigator() {
  return <MyStack />;
}
