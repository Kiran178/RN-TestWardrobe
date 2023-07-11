import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Colors from '../assets/colors/Colors';

const ButtonOutline = ({onPress, title, style, disabled}) => {
  return (
    <Pressable
      style={[styles.wrapper, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    height: 40,
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
  },
});
