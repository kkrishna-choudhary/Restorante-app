import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Button, SafeAreaView, ScrollView, Image, Text, StyleSheet,ToastAndroid } from 'react-native';
import { DISHES } from '../shared/dishes';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerItems } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
  return {
    // dishes: state.dishes,
    // comments: state.comments,
    // promotions: state.promotions,
    // leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})



const MainNavigator = createDrawerNavigator();

function LoginComponent() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <LoginNavigator.Screen name="Login" component={Login} options={({ navigation }) => (
        {
          title: 'Login',
          headerLeft: () => (<Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()} />)
        })} />
    </LoginNavigator.Navigator>
  )
}

function HomeComponent() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <HomeNavigator.Screen name="Home" component={Home} options={({ navigation }) => (
        {
          title: 'Home',
          headerLeft: () => (<Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  )
}

function MenuComponent() {

  const MenuNavigator = createStackNavigator();

  return (

    <MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }

    }}>

      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => (
          {
            title: 'Menu',
            headerLeft: () => (<Icon name="menu" size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()} />)
          })} />
      <MenuNavigator.Screen name="DishDetail" component={Dishdetail} />
    </MenuNavigator.Navigator>
  )
}


function AboutComponent() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <AboutNavigator.Screen name="About Us" component={About} options={({ navigation }) => ({
        title: 'About Us',
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />)
      })} />
    </AboutNavigator.Navigator>
  )
}

function ContactComponent() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <ContactNavigator.Screen name="Contact Us" component={Contact} options={({ navigation }) => ({
        title: 'Contact Us',
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />)
      })} />
    </ContactNavigator.Navigator>
  )
}


function ReservationComponent() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <ReservationNavigator.Screen name="Reservation" component={Reservation} options={({ navigation }) => ({
        title: 'Reservation',
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />)
      })} />
    </ReservationNavigator.Navigator>
  )
}

function FavoritesComponent() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <FavoritesNavigator.Screen name="Favorites" component={Favorites} options={({ navigation }) => ({
        title: 'My Favorites',
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />)
      })} />
    </FavoritesNavigator.Navigator>
  )
}



class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

    NetInfo.addEventListener(()=>this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(()=> this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }


  render() {

    const CustomDrawerContentComponent = (props) => (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
              <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
      </ScrollView>
    );

    return (

      <MainNavigator.Navigator initialRouteName="Menu" drawerStyle={{ backgroundColor: '#D1C4E9' }} drawerContentOptions={{ activeTintColor: '#fff', /* font color for active screen label */  activeBackgroundColor: '#9484b3', /* bg color for active screen */  inactiveTintColor: 'grey', /* Font color for inactive screens' labels */ }} drawerContent={props => <CustomDrawerContentComponent {...props} />} >
        <MainNavigator.Screen name="Login" component={LoginComponent} options={{
          title: 'Login', drawerIcon: ({ tintColor, focused }) => (
            <Icon name='sign-in' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="Home" component={HomeComponent} options={{
          title: 'Home', drawerIcon: ({ tintColor, focused }) => (
            <Icon name='home' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="Menu" component={MenuComponent} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='list' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="About Us" component={AboutComponent} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='info-circle' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="Contact Us" component={ContactComponent} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='address-card' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="Favorite" component={FavoritesComponent} options={{
          title:'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='heart' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        <MainNavigator.Screen name="Reservation" component={ReservationComponent} options={{
          title:'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='cutlery' type='font-awesome' size={20} color={tintColor} />
          )
        }} />
        
      </MainNavigator.Navigator>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);