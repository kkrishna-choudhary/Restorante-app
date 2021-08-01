import React, { Component } from 'react'
import { View ,Text, FlatList,ScrollView} from 'react-native';
import {Card, ListItem, Avatar} from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History(){
        return(
            <Card>
                <Card.Title>Our History</Card.Title>
                <Card.Divider />
                <Card.FeaturedSubtitle style={{color:"#2B2928"}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Card.FeaturedSubtitle>
                <Card.FeaturedSubtitle style={{color:"#2B2928"}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Card.FeaturedSubtitle>           
            </Card>
        )
}


 class AboutComponent extends Component {

   
    

    render() {

        const renderLeader = ({item, index}) => {
            return (    
                    <ListItem key={index} >
                        <Avatar rounded source={{uri: baseUrl + item.image}} />
                        <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>                      
                    </ListItem>
            );
        };

       
        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                        <History />
                        <Card
                            title='Corporate Leadership'>
                            <Loading />
                        </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History />
                        <Card
                            title='Corporate Leadership'>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else{
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History/>
                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Card.Divider />
                            <FlatList 
                                data={this.props.leaders.leaders}
                                renderItem={renderLeader}
                                keyExtractor={item => item.id.toString()}  
                            />                                  
                        </Card>      
                    </Animatable.View>         
                </ScrollView>           
            )
        }
    }
}


export default connect(mapStateToProps)(AboutComponent);