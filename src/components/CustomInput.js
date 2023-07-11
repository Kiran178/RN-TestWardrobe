import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

//Icon and Icon Size Variables
const ICON_SIZE = 20;
const EYE_OPEN_ICON = 'eye';
const EYE_CLOSE_ICON = 'eye-off';
const MAIL_ICON = 'mail';
const LOCK_ICON = 'lock';

const CustomInput = props => {
  const {
    keyboardType,
    placeholder,
    onChangeText,
    showPassword,
    handleShowPassword,
    value,
    style,
  } = props;
  const iconName = !showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON;
  return (
    <View style={[style, styles.wrapper]}>
      <View style={styles.helper}>
        <Feather
          name={
            placeholder?.toLowerCase() === 'password' ? LOCK_ICON : MAIL_ICON
          }
          size={ICON_SIZE}
          color={Colors.white}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGreen}
          keyboardType={keyboardType ? keyboardType : 'default'}
          value={value}
          secureTextEntry={showPassword}
          autoCapitalize="none"
        />
      </View>
      {placeholder?.toLowerCase() === 'password' ? (
        <Pressable onPress={handleShowPassword}>
          <Feather
            name={iconName}
            size={ICON_SIZE}
            color={Colors.white}
            style={styles.icon}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGreen,
  },
  helper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: Colors.white,
    paddingHorizontal: 20,
    height: 40,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
