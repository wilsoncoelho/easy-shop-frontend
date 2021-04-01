import React , {useContext}from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CartIcon from '../Shared/CartIcon'
//Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator'
import AdminNavigator from './AdminNavigator'
import AuthGlobal from '../Context/store/AuthGlobal'
const Tab = createBottomTabNavigator();

const Main = () => {


  const context = useContext(AuthGlobal)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
            name="home"
            color={color}
            size={30}
          />
          ),
        }}
      />



      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
           

            <View>
              <Icon
              name="shopping-cart"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
            <CartIcon/>
            </View>
          ),
        }}
      />
{context.stateUser.user.isAdmin == true?( <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="cog"
              color={color}
              size={30}
            />
          ),
        }}
      />):(null)}
     

<Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
