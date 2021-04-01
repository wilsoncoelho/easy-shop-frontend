import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Button,
  View,
  Text,

} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import ListItem from "./ListItem";
let { width, height } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold'}}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold'}}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold'}}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold'}}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setproductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => console.log(err));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setproductFilter(res.data);
        setLoading(false);
      });
      // .catch((err) => console.log(err));
      return () => {
        setProductList();
        setproductFilter();
        setLoading();
      };
    }, [])
  );

  const searchProduct = (text) => {
      if(text == "" ) {
          setproductFilter(productList)
      }
      setproductFilter(productList.filter((i)=>
        i.name.toLowerCase().includes(text.toLowerCase())
      ))
  }

  return (
    <View style={styles.container}>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input placeholder="Search" onChangeText={(text)=>searchProduct(text)} />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner:{
      height:height/2,
      alignItems:'center',
      justifyContent:'center'
  }
});
