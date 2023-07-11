import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import Colors from '../../assets/colors/Colors';

import Feather from 'react-native-vector-icons/Feather';
const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    email: '',
  });
  const profile = require('../../assets/images/profileWardrobe.png');
  const ICON_SIZE = 25;
  const BACK_ICON = 'chevron-left';
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.button}>
            <Feather name={BACK_ICON} size={ICON_SIZE} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helper}>
          <View style={styles.profileImage}>
            <Image source={profile} style={styles.logoImage} />
          </View>

          <CustomInput
            placeholder="Name"
            value={profileDetails.name}
            onChangeText={val =>
              setProfileDetails(prevState => ({...prevState, name: val}))
            }
            style={styles.inputHelper}
          />
          <CustomInput
            placeholder="email"
            value={profileDetails.email}
            onChangeText={val =>
              setProfileDetails(prevState => ({...prevState, email: val}))
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  helper: {
    paddingHorizontal: 50,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: Colors.white,
    marginBottom: 30,
  },
  inputHelper: {
    marginBottom: 30,
  },
  startAcion: {
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  save: {
    textAlign: 'center',
    color: Colors.black,
  },
});
