import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availablity, setAvailablity] = useState(null);
  const [availablityText, setAvailablityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailablity(<TrafficLight unavailable></TrafficLight>);
      setAvailablityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailablity(<TrafficLight limited></TrafficLight>);
      setAvailablityText("Limited");
    } else {
      setAvailablity(<TrafficLight available></TrafficLight>);
      setAvailablityText("Available");
    }

    return () => {
      setAvailablity(null);
      setAvailablityText("");
    };
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>

        <View style={styles.availablityContainer}>
          <View style={styles.availablity}>
            <Text style={{marginRight:10}}>Availablity:{availablityText}</Text>
            {availablity}
          </View>
        </View>
        <Text>{item.description}</Text>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>${item.price}</Text>
        </Left>
        <Right>
          <EasyButton
            medium
            primary
            onPress={() => {
              props.addItemtoCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to cart`,
                  text2: "Go to your cart to complete order.",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </Right>
      </View>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemtoCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 100,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    color: "red",
    margin: 20,
  },
  availablityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availablity:{
    flexDirection:'row',
    marginBottom:10
  }
});
