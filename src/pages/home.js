import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'
import Button from '../components/button';

const { width } = Dimensions.get('window');

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Grow Together!</Text>
        <Image source={require("../images/biking.png")} style={styles.banner}/>
        <Image source={require('../images/ground.png')}  />
        <View style={{backgroundColor: '#D9F1F5', flex: 1, alignItems: 'center', justifyContent: 'space-between', width}}>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Detail')}
          >Get Started</Button>
          <Text style={styles.footer}> By continuing, you agree to our Terms of Use & Privacy Policy</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    // backgroundColor: '#D9F1F5',
  },
  title: {
    fontSize: 25,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 100,
  },
  banner: {
    width: 759 * width / 750,
    height: 525 * width / 750,
  },

  button: {
    width: width * 0.7,
    backgroundColor: '#2AB6CB',
    borderRadius: 60,
  },
  footer: {
    fontSize: 9,
    color: 'gray',
    marginBottom: 10,
  },


});