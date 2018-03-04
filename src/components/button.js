import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends PureComponent {
  static defaultProps = {
    style: {},
    textStyle: {},
  };
  render() {
    const { style, children, onPress, textStyle } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: '#0094EA',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
