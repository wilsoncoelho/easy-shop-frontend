import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base'


let { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
    const { productsFiltered } = props
    return (
       <Content style={{width: width}}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item)=> (
                    <ListItem
                    onPress={()=>props.navigation.navigate('Product Detail', {item:item})}
                    key={item._id.$oid}
                    avatar
                    >
                        <Left>
                            <Thumbnail
                            source={{uri: item.image ? item.image : 'https://cdn.pixabay.com/photo20120401/17/29/box-23649_960_720.png'}}
                            />
                        </Left>
                        <Body>
                            <Text>
                                {item.name}
                            </Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ):(<View style={styles.center}>
                <Text style={{alignSelf: 'center'}}>
                    No Products match the selected criteria
                </Text>
            </View>)}
       </Content>
    )
}

export default SearchedProducts

const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },

})
