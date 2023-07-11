import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WardrobeImage = require('../assets/images/wardrobe.jpeg');

const IMAGE_SIZE = 50;
const WatchCard = props => {
  const {title, likeCount, viewCount} = props;
  return (
    <View style={styles.wrapper}>
      <Image source={WardrobeImage} style={styles.banner} />
      <View style={styles.contentWrapper}>
        <Image source={WardrobeImage} style={styles.profile} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.contentWrapper}>
            <View style={styles.likeWrapper}>
              <Pressable>
                <AntDesign
                  name="hearto"
                  size={20}
                  color={Colors.red}
                  style={styles.likeIcon}
                />
              </Pressable>
              <Text style={styles.likeText}>{likeCount}</Text>
            </View>
            <View style={styles.viewWrapper}>
              <Text style={styles.viewCount}>{viewCount}</Text>
              <Text style={styles.likeText}>Views</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WatchCard;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  profile: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    resizeMode: 'cover',
    marginRight: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: 5,
    color: Colors.black,
  },
  likeIcon: {
    marginRight: 5,
  },
  viewCount: {
    marginRight: 5,
    color: Colors.black,
  },
  likeText: {
    color: Colors.black,
  },
});
