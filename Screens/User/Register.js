import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import Input from "../../Shared/Form/Input";
import FormContainer from "../../Shared/Form/FormContainer";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import Toast from 'react-native-toast-message'
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false
    };

    axios.post(`${baseURL}users/register`, user)
    .then((res)=>{
      if(res.status==200){
        Toast.show({
          topOffset:60,
          type:"success",
          text1:"Registration Succeeded",
          text2:"Please login into your account"
        })
        setTimeout(() => {
          props.navigation.navigate('Login')
        }, 500);
      }
    })
    .catch((error)=>{
      Toast.show({
        topOffset:60,
        type:"error",
        text1:"Something went wrong!",
        text2:"Please try again."
      })
    })
  };

  return (
    <KeyboardAwareScrollView
      viewInsideTabBar={true}
      extraHeight={200}
      enabledOnAndroid={true}
    >
      <FormContainer title="Register">
        <Input
          placeholder="Email"
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => {
            setEmail(text.toLowerCase());
          }}
        />

        <Input
          placeholder="Name"
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <Input
          placeholder="Phone"
          name={"phone"}
          id={"phone"}
          value={phone}
          KeyboardType={"numeric"}
          onChangeText={(text) => {
            setPhone(text);
          }}
        />

        <Input
          placeholder="Password"
          name={"password"}
          id={"password"}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <View>{error ? <Error message={error} /> : null}</View>
        <View style={[styles.buttonGroup, { marginTop: 40 }]}>
          <Button title="Register" onPress={() => register()} />
        </View>
        <View style={[styles.buttonGroup, { marginTop: 40 }]}>
          <Button
            title="Back to Login"
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignItems: "center",
    color: "black",
  },
});
