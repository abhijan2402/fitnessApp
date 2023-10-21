import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import Step from '../../components/new-auth/Step';
import NewButtob from '../../components/Button/NewButtob';
import { TextInput } from 'react-native';
import Flag from '../../../assets/images/india-flag-icon.svg';
import { Dimensions } from 'react-native';
import { SCREENS } from '../../constants/Screens';
import { SendOTP } from '../../backend/utilFunctions';
import CustomToast from '../../components/common/Toast';

const { width } = Dimensions.get('window');

const SIgnin = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');


  const handlePress = async () => {
    try {
      if (number.length < 1) {
        setToastMessage('Phone Number is required');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
        return
      }

      if (number.length !== 10) {
        setToastMessage('Phone Number must be 10 digit');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
        return
      }
      const res = await SendOTP(number);
      console.log('data', res);
      navigation.navigate(SCREENS.NOTP, {
        data: { phone: number, hash: res?.hash },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader next={true} />
      <Step text="STEP 1/12" />
      <Text style={styles.heading}>Let’s start with your mobile number</Text>
      <Text style={styles.subHeading}>Number we can use to reach you</Text>

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row', gap: 11 }}>
          <Flag width={25} />
          <Text style={styles.countryCode}>+91</Text>
        </View>
        <TextInput
          placeholder="9093XXXXXX"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => setNumber(text)}
        />
      </View>
      <View
        style={{
          marginTop: 70,
          marginTop: 150,
          position: 'absolute',
          bottom: 40,
          width,
          alignItems: 'center',
        }}>
        <NewButtob
          // onPress={() => navigation.navigate(SCREENS.NOTP)}
          title={'Verify Now'}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default SIgnin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    flex: 1,
    alignItems: 'center',
  },

  inputContainer: {
    backgroundColor: '#fff',
    width: 283,
    marginTop: 30,
    elevation: 20,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  countryCode: {
    color: '#2D3142',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },

  input: {
    height: '100%',

    color: '#2D3142',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    width: 170,
  },

  heading: {
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    width: 281,
  },

  subHeading: {
    color: '#4C5980',
    textAlign: 'center',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.2,
    marginTop: 12,
  },
});
