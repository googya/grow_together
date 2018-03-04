import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  AsyncStorage,
} from 'react-native'

const { width, height } = Dimensions.get('window');
const data_url = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
const token = 'ZVKgYbjoOxoM9fvuhDvQOAtt';

const ratio = width/375;

export default class DetailsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: (<Text>Get Active</Text>),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    // TODO //deal error
    AsyncStorage.getItem("__data__").then(e => {
      if (e) {
        this.setState({
          data: JSON.parse(e)
        })
      } else {
        this.fetchData().then(e => e.json()).then(e => {
          this.setState({
            data: e.get_active,
          });
          AsyncStorage.setItem("__data__", JSON.stringify(e.get_active))
        })
      }
    })
  }

  fetchData() {
    return fetch(data_url, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Token token=${token}`,
      },
    })
  }

  renderItems(data) {
    return data.map(item => {
      return (
        <View style={{flex: 1, alignItems: 'center', marginBottom: 40,}}>
          <Image source={{uri: 'http:' + item.image.url } } style={styles.headerImg}/>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.instruction}>{item.instruction}</Text>
          {
            item.steps.map((e, i) => {
              return <View style={{alignItems: 'center'}}>
                <Text style={styles.step}>STEP {i}</Text>
                <Text style={styles.instruction}>{e}</Text>
              </View>
            })
          }
        </View>
      )
    })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        { this.renderItems(this.state.data) }
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImg: {
    width: 140 * ratio ,
    height: 140 * ratio,
    borderRadius: 70 * ratio,
    marginBottom: 20,
    marginTop: 20,
  },

  name: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },

  instruction: {
    fontWeight: '300',
    marginLeft: 30,
    marginRight: 30,
  },
  step: {
    color: '#5FC5D7',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  }
});