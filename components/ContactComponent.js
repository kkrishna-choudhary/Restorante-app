import React, { Component } from 'react';
import { View ,Text} from 'react-native';
import {Card ,Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// import { MailComposer } from 'expo';
import * as MailComposer from 'expo-mail-composer';

 class ContactComponent extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return (    
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>  
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>121, Clear Water Bay Road</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>Clear Water Bay, Kowloon</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>HONG KONG</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>Tel: +852 1234 5678</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>Fax: +852 8765 4321</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{color:"#2B2928"}}>Email:confusion@food.net</Card.FeaturedSubtitle>
                    <Button
                        title=" Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
            </Animatable.View> 
            
        )
    }
}


export default ContactComponent;