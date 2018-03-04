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
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const { width, height } = Dimensions.get('window');
const data_url = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
const token = 'ZVKgYbjoOxoM9fvuhDvQOAtt';

const ratio = width/375;
const music_url = 'http://zhangmenshiting.qianqian.com/data2/music/fec1add99fdbd15a8ceff5b3b969c070/544866165/544866165.mp3';

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
      duration: 0,
    };
  }

  componentDidMount() {
    // TODO //deal error
    this.whoosh =  new Sound(music_url, '', (error) => {
      if (error) {
        return;
      }
      this.setState({duration: this.whoosh.getDuration()})
    });

    this.whoosh.play();

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

  componentWillUnmount() {
    this.whoosh && this.whoosh.reset();
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
      <View style={styles.container}>
      <ScrollView >
        { this.renderItems(this.state.data) }
      </ScrollView>
        <Text style={styles.duration}>
         dur { this.state.duration }
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
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
  },
  duration: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    textAlign: 'center',
  }
});