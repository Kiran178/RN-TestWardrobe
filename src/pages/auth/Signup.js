import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../../components/CustomInput';
import ButtonOutline from '../../components/ButtonOutline';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import {AuthStyles} from './authStyle';
import {useMutation} from '@apollo/client';
import {CREATE_USER} from '../../graphql/authSchema';
import {getUniqueId} from 'react-native-device-info';
import {useToast} from 'react-native-toast-notifications';
import useKeyboardActive from '../../hooks/useKeyboardActive';
import {IOS} from '../../utils/Platform';
import Loader from '../../components/Loader';

const LogoImage = require('../../assets/images/logo.png');

const Signup = ({navigation}) => {
  const toast = useToast();
  const keyboard = useKeyboardActive();
  const [showPassword, setShowPassword] = useState(true);
  const [signupDetails, setSignupDetails] = useState({
    username: '',
    email: '',
    password: '',
    deviceId: '',
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      setSignupDetails(prev => ({...prev, deviceId: uniqueId}));
    });
  }, []);

  const [createUser, {loading}] = useMutation(CREATE_USER);
  const handleCreateUser = async () => {
    try {
      const {data} = await createUser({
        variables: {
          userInput: {
            username: signupDetails.username,
            password: signupDetails.password,
            email: signupDetails.email,
            deviceId: signupDetails.deviceId,
          },
        },
      });
      // Handle success, access the returned data
      toast.show(data.createUser.message, {
        type: 'success',
        placement: 'bottom',
        duration: 2000,
        offset: 50,
        animationType: 'slide-in',
      });
      navigation.navigate('LoginScreen');
    } catch (error) {
      // Handle error
      setSignupDetails({
        email: '',
        password: '',
        username: '',
      });
      toast.show(error.message, {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
        offset: 50,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? <Loader /> : null}
      <View
        style={[
          AuthStyles.container,
          IOS ? {paddingBottom: keyboard.keyboardHeight} : null,
        ]}>
        <SafeAreaView>
          <Image source={LogoImage} style={AuthStyles.logoImage} />
          <CustomInput
            placeholder="User Name"
            value={signupDetails.username}
            onChangeText={val =>
              setSignupDetails(prevState => ({...prevState, username: val}))
            }
            style={AuthStyles.inputHelper}
          />
          <CustomInput
            placeholder="Email"
            value={signupDetails.email}
            keyboardType="email-address"
            onChangeText={val =>
              setSignupDetails(prevState => ({...prevState, email: val}))
            }
            style={AuthStyles.inputHelper}
          />
          <CustomInput
            placeholder="Password"
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            value={signupDetails.password}
            secureTextEntry
            onChangeText={val =>
              setSignupDetails(prevState => ({...prevState, password: val}))
            }
          />
          <View>
            <View style={AuthStyles.textWrapper}>
              <Text style={AuthStyles.text}>Already a Member?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={AuthStyles.textLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ButtonOutline
              title="Sign Up"
              style={AuthStyles.buttonHelper}
              onPress={handleCreateUser}
              disabled={
                signupDetails.email === '' ||
                signupDetails.password === '' ||
                signupDetails.username === ''
                  ? true
                  : false
              }
            />
            <Text style={AuthStyles.orText}>OR</Text>
            <GoogleLoginBtn />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Signup;
