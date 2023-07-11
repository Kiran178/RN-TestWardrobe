import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';
import {windowWidth, windowHeight} from '../../utils/Dimensions';

export const AuthStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    minHeight: windowHeight,
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  logoImage: {
    width: windowWidth - 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputHelper: {
    marginBottom: 30,
  },
  buttonHelper: {
    marginVertical: 30,
  },
  orText: {
    textAlign: 'center',
    color: Colors.white,
  },
  textWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  textLink: {
    color: Colors.white,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  linkWrapper: {
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: Colors.white,
    paddingRight: 10,
  },
});
