import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from '../../Shared/Error'

// Context
import AuthGlobal from '../../Context/store/AuthGlobal'
import {loginUser} from '../../Context/actions/Auth.actions' 

const Login = (props) => {

  const context = useContext(AuthGlobal)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

useEffect(() => {
  if(context.stateUser.isAuthenticated === true){
    props.navigation.navigate('User Profile')
  }
  return () => {
    
  }
}, [context.stateUser.isAuthenticated])

  const handleSubmit = () => {
      const user ={
          email,
          password
      }

      if(email ==="" || password===""){
        setError("Please fill in your credentials")
      }else{
          loginUser(user, context.dispatch)
      }
  }

  return (
    <FormContainer>
      <Input
        placeholder="Enter Email"
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text)=> {setEmail(text)}}
      />
      <Input
        placeholder="Enter password"
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=> {setPassword(text)}}
      />
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={()=>handleSubmit()}/>
      </View>
      <View style={[styles.buttonGroup, {marginTop:40}]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>
          {error?<Error message={error}/>:null}
        <Button title="Register" onPress={()=>{
            props.navigation.navigate('Register')
        }}/>
      </View>
    </FormContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
   buttonGroup:{
    width:'80%',
    alignItems:'center'
   },
   middleText:{
       marginBottom:20,
       alignItems:'center',
       color:'black'
   }
});
