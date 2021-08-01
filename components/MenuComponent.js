import React, {Component} from 'react';
import { ScrollView ,StyleSheet} from 'react-native';
import {  FlatList,View,Text} from 'react-native';
import { Tile } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


class Menu extends Component {

    

    


    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (              
                    // <ListItem
                    //     key={index}
                    //     title={item.name}
                    //     subtitle={item.description}
                    //     hideChevron={true}
                    //     leftAvatar={{ source: require('../assets/images/uthappizza.png')}}
                    //   />
    
                    // <ListItem key={index} bottomDivider onPress={() => navigate('DishDetail', { dishId: item.id })}>
                    //     <Avatar source={ { uri: baseUrl + item.image}} />
                    //     <ListItem.Content>
                    //     <ListItem.Title>{item.name}</ListItem.Title>
                    //     <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                    //     </ListItem.Content>
                       
                    // </ListItem>
                    <Animatable.View animation="fadeInRightBig" duration={2000}>  
                        <Tile onPress={() => navigate('DishDetail', { dishId: item.id })}
                            key={index}
                            title={item.name}
                            caption={item.description}
                            imageSrc={{ uri: baseUrl + item.image}}
                            featured
                            />
                    </Animatable.View>

            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}  
                />
           
            );
        }        
    }    
}





export default connect(mapStateToProps)(Menu);