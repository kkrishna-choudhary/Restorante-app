import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList ,StyleSheet , Button,Modal , Alert, PanResponder, Share} from 'react-native';
import { Card, Icon ,Input,Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite ,postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author , comment) => dispatch(postComment(dishId, rating, author , comment))
})

class RenderDish extends Component{

    handleViewRef = ref => this.view = ref;
    

    render(){
        const dish = this.props.dish;

        const shareDish = (title, message, url) => {
            Share.share({
                title: title,
                message: title + ': ' + message + ' ' + url,
                url: url
            },{
                dialogTitle: 'Share ' + title
            })
        }

        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }
        const recognizeComment = ({ moveX, moveY, dx, dy }) => {
            if ( dx > 200 )
                return true;
            else
                return false;
        }
    
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
            },
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                if (recognizeDrag(gestureState)){Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {this.props.favorite ? console.log('Already favorite') : this.props.onPress()}},
                    ],
                    { cancelable: false }
                );}
                    
                if (recognizeComment(gestureState)){this.props.toggleCommentModal();}
                    
    
                return true;
            }
        })
        
            if (dish != null) {
                return (
                    // <Card
                    // featuredTitle={dish.name}
                    // image={require('./images/uthappizza.png')}>
                    //     <Text style={{margin: 10}}>
                    //         {dish.description}
                    //     </Text>
                    // </Card>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                        ref={this.handleViewRef}
                        {...panResponder.panHandlers} >
                        <Card>
                            <Card.Title>{dish.name}</Card.Title>
                            <Card.Divider />
                            <Card.Image source={{uri: baseUrl + dish.image}}/>
                            <Text style={{ margin: 10 }}>
                                    {dish.description}
                            </Text>
                            <View style={styles.formRow}>
                            <Icon
                                raised
                                reverse
                                name={ this.props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => this.props.favorite ? console.log('Already favorite') : this.props.onPress()}
                                />
                                
                            <Icon                    
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => this.props.toggleCommentModal()}
                                />
                            
                            <Icon
                                raised
                                reverse
                                name='share'
                                type='font-awesome'
                                color='#51D2A8'
                                style={styles.cardItem}
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />

                            </View>                                
                        </Card>
                    </Animatable.View>
        
                );
            }
            else {
                return (<View></View>);
            }
        
    }
    

   
}


function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}> <Rating imageSize={15} readonly startingValue={item.rating} style={{paddingTop:5}}   /></Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>  
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    extraData={comments}
                    />
            </Card>
        </Animatable.View>
    );
}



class DishDetail extends Component{

    constructor(props) {
        super(props);

        this.state = {
            rating:0,
            author:'',
            comment:'',
            showCommentModal: false
        }
    }

    toggleCommentModal() {
        this.setState({showCommentModal: !this.state.showCommentModal});
    }

    handleAddComment(dishId) {        
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment)
        this.toggleCommentModal();       
    }


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render(){
        const { dishId } = this.props.route.params;
        return (
        <ScrollView>
            
            <RenderDish dish={this.props.dishes.dishes[dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleCommentModal={()=>{this.toggleCommentModal()}} />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showCommentModal}
                    onDismiss = {() => this.toggleCommentModal() }
                    onRequestClose = {() => this.toggleCommentModal() }>
                    <View style = {styles.modal}>
                        <Rating
                        showRating
                        onFinishRating={(rating)=>{this.setState({rating:rating})}}
                        style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder=' Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={author => this.setState({ author: author})}
                        />
                        <Input
                            placeholder=' Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        
                        <View style={{padding:10}}>
                            <Button 
                            onPress = {() =>{this.handleAddComment(dishId) }}
                            color="#512DA8"
                            title="SUBMIT" 
                            />
                        </View>
                        
                        <View style={{padding:10}}>
                            <Button 
                            onPress = {() =>{this.toggleCommentModal(); }}
                            color="#8f8c8c"
                            title="CANCEL" 
                            />
                        </View>
                        
                    </View>
                </Modal>
        </ScrollView>
        );
        
    }    
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);