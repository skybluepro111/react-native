import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AppRegistry
} from 'react-native';


import Login from './pages/session/login';
import Signup from './pages/session/signup';
import Signin from './pages/session/signin';
import ListPage from './pages/ListPage/ListPage';
import VideoRecord from './pages/VideoRecord/VideoRecord';

export default class App extends Component {

    constructor(props){
    super(props);
    this.state = {
      page: null
    };
  }

  componentWillMount(){
      this.setState({page: Login});
  }
  render() {
    if (this.state.page) {
      return (
        <Navigator
          initialRoute={{component: this.state.page, title:'login'}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
              switch ( route.title ) {
                  case 'login':
			    	return <Login title={route.title} navigator={navigator}/>;
                case 'signup':
			    	return <Signup title={route.title} navigator={navigator}/>;
                case 'signin':
			    	return <Signin title={route.title} navigator={navigator}/>;
                case 'listpage':
			    	return <ListPage title={route.title} navigator={navigator}/>;
                case 'videorecord':
			    	return <VideoRecord title={route.title} navigator={navigator}/>;
                default:
                    return <View style={ { flex: 1 , justifyContent: 'center' , alignItems: 'center' } }>
                        <Text>{`Undefined route: ${route.title}`}</Text>
                    </View>
              }

        }} /> 
     );
    } else {
      return (
        // Our default loading view while waiting to hear back from firebase
        <View >
          <ToolbarAndroid title="RN Firebase Auth" />
          <View >
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    }
  }
}
AppRegistry.registerComponent('App', () => App);