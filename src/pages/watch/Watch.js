import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import WatchCard from '../../components/WatchCard';
import {watchData} from '../../assets/data';
import Colors from '../../assets/colors/Colors';

const DEFAULT_CATEGORY = 'All';
const Watch = () => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);

  const uniqueCategories = [...new Set(watchData.map(item => item.category))];
  uniqueCategories.unshift(DEFAULT_CATEGORY);

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => setActiveCategory(item)}
      style={[
        styles.categoryBtn,
        activeCategory === item
          ? {backgroundColor: Colors.green}
          : {backgroundColor: Colors.lightGray},
      ]}>
      <Text
        style={[
          styles.categoryText,
          activeCategory === item
            ? {color: Colors.white}
            : {color: Colors.black},
        ]}>
        {item}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <View>
          <FlatList
            style={styles.categoryWrapper}
            data={uniqueCategories}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {watchData?.map((val, index) => (
            <View key={index}>
              <WatchCard
                title={val.title}
                likeCount={val.likeCount}
                viewCount={val.viewCount}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Watch;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  categoryWrapper: {
    backgroundColor: Colors.white,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontWeight: '700',
  },
});
