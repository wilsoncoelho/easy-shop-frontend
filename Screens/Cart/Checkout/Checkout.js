import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { Form, Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import countries from "../../../assets/countries.json";

let { height } = Dimensions.get("window");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
      let order = {
          city,
          country,
          dateOrdered:Date.now(),
          orderItems,
          phone,
          shippingAddress1:address,
          shippingAddress2:address2,
          zipcode,
      }

      props.navigation.navigate('Payment', {order: order})
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"Shipping Address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"Shipping Address2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"City"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zipcode"}
          value={zipcode}
          onChangeText={(text) => setZipcode(text)}
        />
        <Item picker>
          <Picker
          mode='dropdown'
          iosIcon={<Icon name='arrow-down' color={'#007aff'}/>}
          style={{width:undefined}}
          selectedValue={country}
          placeholder={'Select your country'}
          placeholderStyle={{color:'#007aff'}}
          placeholderIconColor={{color:'#007aff'}}
          onValueChange={(e)=>setCountry(e)}
          
          >
              {countries.map((c)=>{
                  return <Picker.Item key={c.code} label={c.name} value={c.name} />
              })}
          </Picker>
        </Item>
        <View style={{width:'100%', alignItems:'center'}}>
              <Button title={'Confirm'} onPress={()=>checkOut()}/>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
    const {cartItems} = state
    return {
        cartItems:cartItems
    }
}

export default connect(mapStateToProps)(Checkout);

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});
