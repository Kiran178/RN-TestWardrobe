import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GoogleLoginBtn = () => {
  return (
    <Pressable style={styles.wrapper}>
      <AntDesign name="googleplus" size={25} color={Colors.white} />
      <Text style={styles.text}>Continue with Google</Text>
    </Pressable>
  );
};

export default GoogleLoginBtn;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginVertical: 30,
    backgroundColor: Colors.black,
    paddingHorizontal: 30,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 20,
  },
});
