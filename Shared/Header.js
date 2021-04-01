import React from "react";
import { StyleSheet,Text, View, SafeAreaView, Image } from "react-native";


const Header = () => {
  return (
    <SafeAreaView style={styles.header}>

        <Image
          
          source={require("../assets/Logo.png")}
          resizeMode="contain"
          style={{ height: 60 }}
        />

    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
    marginTop:0
  },
});
