import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import GirlSvg from '../../../assets/icons/dumble_girl.svg';
import UserSvg from '../../../assets/icons/User.svg';
import ScreenContainer from '../../components/container/ScreenContainer';
import Heading from '../../components/Text/Heading';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import {GENDERS} from '../../constants/Data';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CalenderPicker from '../../components/Utils/CalenderPicker';
import PickerLabel from '../../components/Label/PickerLabel';
import Calendar from '../../../assets/icons/Calendar.svg';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import Weight from '../../../assets/icons/weight-scale.svg';
import Swap from '../../../assets/icons/Swap.svg';
import Input from '../../components/Form/Input';
import SecondaryLabel from '../../components/Label/SecondaryLabel';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import CustomToast from '../../components/common/Toast';
import {useRef} from 'react';
import {ActivityIndicator} from 'react-native';

function CreateProfile({user, setUser}) {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [loading, setLoading] = useState(false);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  function reverseDate() {
    const date_splitted = date.split('/');
    const day = date_splitted[0];
    const month = date_splitted[1];
    const year = date_splitted[2];
    return year + '/' + month + '/' + day;
  }
  function onNext() {
    try {
      if (!gender) throw 'Select Your Gender';
      if (!date) throw 'Select your Date of Birth';
      if (!weight) throw 'Enter your weight';
      if (!height) throw 'Enter your height';
      setUser({...user, gender, dob: reverseDate(), weight, height});
      navigation.navigate(SCREENS.GOAL);
    } catch (error) {
      setToastMessage(error);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <GirlSvg width={270} height={270} />
      </View>
      <ScreenContainer paddingTop={0}>
        <Heading
          heading={'Let’s complete your profile'}
          subheading={'It will help us to know more about you!'}
        />
        <DropdownPicker
          data={GENDERS}
          value={gender}
          setValue={setGender}
          placeholder="Choose Gender"
          icon={<UserSvg width={20} height={20} />}
        />
        <CalenderPicker
          setDate={setDate}
          label={
            <PickerLabel
              title={date ? date : 'Date of Birth'}
              icon={<Calendar width={20} height={20} />}
            />
          }
        />
        <View style={styles.weight}>
          <Input
            placeholder={'Your Weight'}
            customStyle={{width: '80%'}}
            value={weight}
            onChangeText={text => setWeight(text)}
            icon={<Weight width={20} height={20} />}
          />
          <SecondaryLabel
            title={'KG'}
            containerStyle={styles.weightLabelContainer}
          />
        </View>
        <View style={styles.weight}>
          <Input
            placeholder={'Your Height'}
            customStyle={{width: '80%'}}
            value={height}
            onChangeText={text => setHeight(text)}
            icon={<Swap width={20} height={20} />}
          />
          <SecondaryLabel
            title={'FT'}
            containerStyle={styles.weightLabelContainer}
          />
        </View>
        {loading ? (
          <ActivityIndicator size={30} color={'blue'} />
        ) : (
          <PrimaryButton
            onPress={() => onNext()}
            title={'Next'}
            containerStyle={{marginTop: 15}}>
            <View style={{marginLeft: 5, bottom: 1.5}}>
              <ArrowRight width={15} height={15} />
            </View>
          </PrimaryButton>
        )}
      </ScreenContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  weight: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  weightLabelContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginLeft: 10,
  },
});
export default CreateProfile;
