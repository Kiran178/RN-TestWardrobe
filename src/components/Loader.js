import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
