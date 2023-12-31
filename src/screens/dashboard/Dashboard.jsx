import React, { useContext, useEffect, useState } from 'react';
import ScreenContainer from '../../components/container/ScreenContainer';
import { View, StyleSheet, Image, Text } from 'react-native';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import SolidButton from '../../components/Button/SolidButton';
import Notification from '../../../assets/icons/Notification.svg';
import GradientLabel from '../../components/Label/GradientLabel';
import { COLORS } from '../../constants/Colors';
import TextMedium from '../../components/Text/TextMedium';
import SecondaryButton from '../../components/Button/SecondaryButton';
import { FONTS } from '../../constants/Fonts';
import SolidContainer from '../../components/container/SolidContainer';
import PrimaryButton from '../../components/Button/PrimaryButton';
import LargeText from '../../components/Text/LargeText';
import PairText from '../../components/Text/PairText';
import ProgressBar from '../../components/progress/ProgressBar';
import ListBullet from '../../components/list/ListBullet';
import DataContainer from '../../components/container/DataContainer';
import CircularRing from '../../components/progress/CircularRing';
import { MEALS, WORKOUTS } from '../../constants/Data';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import MealContainer from '../../components/container/MealContainer';
import AnimatedLineChart from '../../components/Utils/LineChart';
import WorkoutContainer from '../../components/container/WorkoutContainer';
import CustomPieChart from '../../components/Utils/PieChart';
import LineGraphWithoutLabel from '../../components/Utils/LineGraphWithoutLabel';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants/Screens';
import { TouchableOpacity } from 'react-native';
import HomeSwiper from '../../components/Utils/HomeSwiper';
import { GlobalContext } from '../../../App';
import {
  dateFormat,
  getDataFromAsyncStorage,
  getTimeInAMPMFormat,
} from '../../utils/common';
import { getUserRecommendedMeal } from '../../backend/utilFunctions';
import Score from '../../../assets/images/Score.svg';

const BASE_TRACKER_CONTAINER_HEIGHT = 350;

function Dashboard(props) {
  const navigation = useNavigation();
  const { user } = useContext(GlobalContext);
  const [ProfComplete, setProfComplete] = useState(false);
  console.log('====================================');
  console.log(user, 'User::::::::::::::::');
  console.log('====================================');
  const [meals, setMeals] = useState(MEALS[0]);
  const [workout, setWorkout] = useState(WORKOUTS[0]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [filteredRecommendedMeals, setFilteredRecommendedMeals] = useState([]);

  function filterMealsBasedOnType(type) {
    const filteredMeals = recommendedMeals.filter(
      meal => meal.meal_period === type,
    );
    return filteredMeals;
  }

  useEffect(() => {
    const currentDate = new Date();
    ProfCom();
    getUserRecommendedMeal(dateFormat(currentDate)).then(res => {
      setRecommendedMeals(res?.data);

      console.log(res?.data);
    });
    console.log('first');
  }, []);

  const ProfCom = async () => {
    const final = await getDataFromAsyncStorage('profComp');
    console.log(final, 'I am final');
    if (final == null) {
      setProfComplete(false);
    } else {
      setProfComplete(true);
    }
  };

  useEffect(() => {
    if (meals === null) setFilteredRecommendedMeals(recommendedMeals);
    else if (meals === 'BREAKFAST')
      setFilteredRecommendedMeals(filterMealsBasedOnType('BREAKFAST'));
    else if (meals === 'LUNCH')
      setFilteredRecommendedMeals(filterMealsBasedOnType('LUNCH'));
    else if (meals === 'DINNER')
      setFilteredRecommendedMeals(filterMealsBasedOnType('DINNER'));
    else setFilteredRecommendedMeals(recommendedMeals);
  }, [meals, recommendedMeals]);

  return (
    <ScreenContainer scroll={true}>
      <View style={styles.profileInfo}>
        <View style={styles.userInfo}>
          <SmallText>Welcome Back,</SmallText>
          <TextH4>{user?.full_name}</TextH4>
        </View>
        <SolidButton
          onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}
          containerStyle={styles.solidButtonContainer}>
          <Notification width={30} height={30} />
        </SolidButton>
      </View>

      {ProfComplete ? null : (
        <View style={styles.scoreCard}>
          <Score />
          <View style={{ width: 192 }}>
            <Text style={styles.scoreHeading}>Incomplete profile</Text>
            <Text style={styles.scoreDesc}>
              Please complete your health details for better experiance
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.FOODDISLIKE)}>
              <Text style={styles.scoreBtn}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <HomeSwiper />
      <GradientLabel
        colors={[
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
        ]}
        conatinerStyle={styles.gradientContainer}>
        <View style={styles.bmiContainer}>
          <View style={{ flexGrow: 1 }}>
            <TextMedium style={{ color: 'white' }}>
              BMI (Body Mass Index)
            </TextMedium>
            <SmallText style={{ color: 'white', marginBottom: 15 }}>
              You have a normal weight
            </SmallText>
            <SecondaryButton
              title={'View More'}
              containerStyle={{ width: 100, height: 40, elevation: 0 }}
              textStyle={{ fontSize: 12 }}
              onPress={() =>
                navigation.navigate(SCREENS.PROGRESSTACK, {
                  screen: SCREENS.WEIGHTTRACKER,
                })
              }
            />
          </View>
          <View>
            <CustomPieChart />
          </View>
        </View>
      </GradientLabel>
      <SolidContainer containerStyle={styles.solidcontainer}>
        <TextMedium style={{ flexGrow: 1 }}>Activities</TextMedium>
        <PrimaryButton
          containerStyle={styles.targetButton}
          textStyle={styles.targetButtonText}
          title={'Check'}
          onPress={() => navigation.navigate(SCREENS.STEP_TRACKER)}
        />
      </SolidContainer>
      <LargeText
        style={{
          fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
          color: 'black',
          marginBottom: 15,
        }}>
        Activity Status
      </LargeText>
      <SolidContainer containerStyle={styles.lineGraphContainer}>
        <LineGraphWithoutLabel />
        <PairText
          containerStyle={styles.stepContainer}
          heading={'STEPS'}
          subHeading="2000"
        />
      </SolidContainer>

      <View style={styles.basicTracker}>
        <DataContainer containerStyle={styles.waterIntakeTracker}>
          <View>
            <ProgressBar
              vertical={true}
              containerStyle={styles.waterInTakeBar}
              gradientContainerStyle={{
                ...styles.waterInTakeGradient,
                height: 200 % BASE_TRACKER_CONTAINER_HEIGHT,
              }}
            />
          </View>
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', paddingTop: 15, marginLeft: 10 }}
            onPress={() => navigation.navigate(SCREENS.WATERDRINK)}>
            <PairText heading={'Water Intake'} subHeading="4 Liters" />
            <SmallText style={{ marginTop: 10, marginBottom: 10 }}>
              Real time updates
            </SmallText>
            <ListBullet title={'6am - 8am'} subTitle={'600ml'} />
            <ListBullet title={'9am - 11am'} subTitle={'500ml'} />
            <ListBullet title={'11am - 2pm'} subTitle={'1000ml'} />
            <ListBullet title={'2pm - 4pm'} subTitle={'700ml'} />
            <ListBullet
              title={'4pm - now'}
              subTitle={'900ml'}
              showLine={false}
            />
          </TouchableOpacity>
        </DataContainer>
        <View
          style={{
            flexGrow: 1,
            height: BASE_TRACKER_CONTAINER_HEIGHT,
            marginRight: 10,
          }}>
          <DataContainer
            containerStyle={styles.sleepContainer}
            onPress={() => navigation.navigate(SCREENS.SLEEPSTACK)}>
            <PairText heading="Sleep" subHeading="8h 20m" />
            <Image
              style={{ marginTop: 15 }}
              source={require('../../../assets/images/Sleep-Graph.png')}
            />
          </DataContainer>
          <DataContainer
            containerStyle={{ ...styles.sleepContainer, ...{ marginBottom: 0 } }}
            onPress={() => navigation.navigate(SCREENS.ACTIVITYTRACKER)}>
            <PairText heading="Calories" subHeading="760 kCal" />
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <CircularRing
                radius={45}
                fontSize={11}
                gap={13}
                label="230kCal left"
              />
            </View>
          </DataContainer>
        </View>
      </View>
      <SolidContainer
        containerStyle={{
          ...styles.solidcontainer,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          marginBottom: 0,
        }}>
        <LargeText
          style={{
            fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
            color: 'black',
            flexGrow: 1,
          }}>
          Today Meals
        </LargeText>
        <GradientDropdown
          data={MEALS}
          value={meals}
          setValue={setMeals}
          placeholder="Select Item"
          containerStyle={{ width: 150, height: 40, borderRadius: 30 }}
        />
      </SolidContainer>
      <View style={{ paddingHorizontal: 10, marginBottom: '5%' }}>
        {filteredRecommendedMeals.length == 0 ?
          <TextH4 style={{ marginVertical: 20 }}>No meals assigned for today</TextH4> :
          filteredRecommendedMeals.map((meal, i) => {
            // console.log(i, meal?.meal?.meal_image, "jjjj");
            return (
              <MealContainer
                key={meal._id}
                img={{ uri: meal?.meal?.meal_image }}
                imgStyle={{ width: 50, height: 50, borderRadius: 8 }}
                title={meal?.meal?.name || ' '}
                time={getTimeInAMPMFormat(new Date(meal.date))}
                date={'Today'}
                onpress={() =>
                  navigation.navigate(SCREENS.MEALSCHEDULER, {
                    filteredRecommendedMeals,
                  })
                }
              />
            );
          })}
      </View>
      {/* <SolidContainer containerStyle={{ ...styles.solidcontainer, backgroundColor: 'white', paddingHorizontal: 10, marginBottom: 0 }}>
                <LargeText style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: 'black', flexGrow: 1 }}>Workout Progress</LargeText>
                <GradientDropdown
                    data={WORKOUTS}
                    value={workout}
                    setValue={setWorkout}
                    placeholder='Select Item'
                    containerStyle={{ width: 150, height: 40, borderRadius: 30 }}
                />
            </SolidContainer>
            <View style={{ overflow: 'hidden' }}>
                <AnimatedLineChart />
            </View>
            <SolidContainer containerStyle={{ ...styles.solidcontainer, backgroundColor: 'white', paddingHorizontal: 10, marginBottom: 0 }}>
                <LargeText style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: 'black', flexGrow: 1 }}>Workout Progress</LargeText>
                <TouchableOpacity>
                    <SmallText style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM }} >See More</SmallText>
                </TouchableOpacity>
            </SolidContainer> */}
      {/* <View style={{ marginBottom: 80, paddingHorizontal: 10 }}>
                <WorkoutContainer
                    img={require('../../../assets/images/sushi.png')}
                    imgBackground={COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1}
                    imgStyle={{ width: 30, height: 30 }}
                    title={'Fullbody Workout'}
                    time={'20min'}
                    cal={'180 Calories Burn'}
                    onPress={()=>navigation.navigate(SCREENS.WORKOUTSTACK,{screen:SCREENS.WORLOUTINFO})}
                />
                <View style={{}}>
                    <PrimaryButton
                        onPress={() => navigation.navigate(SCREENS.WORKOUTSTACK)}
                        title={'View More'}

                    />
                </View>
            </View> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  solidButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  basicTracker: {
    flexDirection: 'row',
  },
  stepContainer: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  sleepContainer: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 10,
    flexGrow: 1,
  },
  waterIntakeTracker: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
    height: BASE_TRACKER_CONTAINER_HEIGHT,
    marginBottom: 0,
  },
  waterInTakeGradient: {
    height: 0,
    position: 'absolute',
    bottom: 0,
  },
  waterInTakeBar: {
    width: 30,
    height: BASE_TRACKER_CONTAINER_HEIGHT - 50,
  },
  targetButton: {
    width: 100,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 40,
  },
  userInfo: {
    flexGrow: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  lineGraphContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'rgba(157, 206, 255,0.2)',
    marginBottom: 15,
  },
  gradientContainer: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    elevation: 5,
    padding: 30,
  },
  bmiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scoreCard: {
    backgroundColor: '#F4F6FA',
    padding: 18,
    height: 167,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
  },

  scoreHeading: {
    color: '#2D3142',
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24 /* 133.333% */,
    letterSpacing: 0.2,
  },

  scoreDesc: {
    color: '#4C5980',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24 /* 171.429% */,
    letterSpacing: 0.2,
    marginTop: 7,
  },

  scoreBtn: {
    color: '#7265E3',
    fontamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 /* 100% */,
    letterSpacing: 0.2,
    paddingLeft: 36,
    marginTop: 20,
  },
});
export default Dashboard;
