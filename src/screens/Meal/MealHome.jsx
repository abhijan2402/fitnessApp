import { StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import SolidContainer from '../../components/container/SolidContainer';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import LargeText from '../../components/Text/LargeText';
import AnimatedLineChart from '../../components/Utils/LineChart';
import { MEALS, WORKOUTS } from '../../constants/Data';
import { FONTS } from '../../constants/Fonts';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import MealContainer from '../../components/container/MealContainer';
import MealCard from '../../components/card/MealCard';
import { SCREENS } from '../../constants/Screens';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  generateRequest,
  getMealDetails,
  getUserRecommendedMeal,
} from '../../backend/utilFunctions';
import { dateFormat, getTimeInAMPMFormat } from '../../utils/common';
import { GlobalContext } from '../../../App';
import TextH4 from '../../components/Text/TextH4';
const { width, height } = Dimensions.get('window');

const MealHome = () => {
  const navigation = useNavigation();
  const [mealPlan, setMealPlan] = useState(WORKOUTS[0]);
  const [meals, setMeals] = useState(null);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [filteredRecommendedMeals, setFilteredRecommendedMeals] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const currentDate = new Date();
      getUserRecommendedMeal(dateFormat(currentDate))
        .then(res => {
          setRecommendedMeals(res?.data);

          console.log(res?.data);
        })
      setRefreshing(false);
    }, 2000);
  }, []);

  function filterMealsBasedOnType(type) {
    const filteredMeals = recommendedMeals.filter(
      meal => meal.meal_period === type,
    );
    return filteredMeals;
  }

  useEffect(() => {
    const currentDate = new Date();

    getUserRecommendedMeal(dateFormat(currentDate))
      .then(res => {
        setRecommendedMeals(res?.data);

        console.log(res?.data);
      })
    console.log('first');
  }, []);

  useEffect(() => {
    if (meals === null) setFilteredRecommendedMeals(recommendedMeals);
    else if (meals === 'BREAKFAST')
      setFilteredRecommendedMeals(filterMealsBasedOnType('BREAKFAST'));
    else if (meals === 'LUNCH')
      setFilteredRecommendedMeals(filterMealsBasedOnType('LUNCH'));
    else if (meals === 'DINNER')
      setFilteredRecommendedMeals(filterMealsBasedOnType('DINNER'));
    else if (meals === 'SNACKS')
      setFilteredRecommendedMeals(filterMealsBasedOnType('SNACKS'));
  }, [meals, recommendedMeals]);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Header title={'Meal Planner'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <SolidContainer
          containerStyle={{
            ...styles.solidcontainer,
            display: 'flex',
            flexdirection: 'row',
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
            Meal Nutritions
          </LargeText>
          <GradientDropdown
            data={WORKOUTS}
            value={mealPlan}
            setValue={setMealPlan}
            placeholder="Select Item"
            containerStyle={{ width: width / 3.7, height: 40, borderRadius: 30 }}
          />
        </SolidContainer>
      </View>
      <View style={{ overflow: 'hidden' }}>
        <AnimatedLineChart />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <SolidContainer
          containerStyle={[styles.solidcontainer, { marginHorizontal: 10 }]}>
          <TextMedium style={{ flexGrow: 1 }}>Daily Meal Schedule</TextMedium>
          <PrimaryButton
            containerStyle={styles.targetButton}
            textStyle={styles.targetButtonText}
            title={'Check'}
            onPress={() => navigation.navigate(SCREENS.MEALSCHEDULER, { filteredRecommendedMeals, })}
          />
        </SolidContainer>
      </View>
      <View style={{ marginHorizontal: 15 }}>
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
            placeholder="Select"
            containerStyle={{ width: width / 2.8, height: 40, borderRadius: 30 }}
          />
        </SolidContainer>
        <View style={{ paddingHorizontal: 10 }}>
          {filteredRecommendedMeals.length == 0 ? <TextH4 style={{ marginVertical: 20 }}>No meals assigned today</TextH4> :
            filteredRecommendedMeals.map((meal, i) => {
              // console.log(i, meal?.meal?.meal_image, "jjjj");

              return (
                <View>
                  {
                    meal?.user_skip ?
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
                      /> : null
                  }
                </View>
              );
            })}
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: '5%' }}>
          <LargeText
            style={{
              fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
              color: 'black',
              flexGrow: 1,
              marginVertical: 5,
            }}>
            Meal
          </LargeText>
          <ScrollView horizontal>
            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="BreakFast"
              NOFood="0"
              backgroundColor={'#D9FFFD'}
              btnBackGround={'#82E1FF'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />
            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="Lunch"
              NOFood="0"
              backgroundColor={'#FFE0DC'}
              btnBackGround={'#FF8ECB'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />

            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="Dinner"
              NOFood="0"
              backgroundColor={'#D9FFFD'}
              btnBackGround={'#82E1FF'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />
          </ScrollView>
        </View>
      </View>
      <View style={{ marginHorizontal: 15, marginBottom: '5%' }}>
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
            Skipped Meals
          </LargeText>
          {/* <GradientDropdown
            data={MEALS}
            value={meals}
            setValue={setMeals}
            placeholder="Select"
            containerStyle={{ width: width / 2.8, height: 40, borderRadius: 30 }}
          /> */}
        </SolidContainer>
        {/* <View style={{ paddingHorizontal: 10 }}>
          <MealContainer
            img={require('../../../assets/images/sushi.png')}
            title={'Salmon Nigiri'}
            time={'7am'}
            date={'Today'}
            onpress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
          />
          <MealContainer
            img={require('../../../assets/images/glass-of-milk.png')}
            title={'Lowfat Milk'}
            time={'8am'}
            date={'Today'}
            onpress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
          />
        </View> */}
        <View style={{ paddingHorizontal: 10 }}>
          {filteredRecommendedMeals.length == 0 ? <TextH4 style={{ marginVertical: 20 }}>No meals skipped today</TextH4> :
            filteredRecommendedMeals.map((meal, i) => {
              console.log(i, meal?.user_skip, "jjjj");
              return (

                <View>
                  {
                    meal?.user_skip ?
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
                      : null
                  }
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealHome;

const styles = StyleSheet.create({
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.111,
  },
  targetButton: {
    width: width / 3.6,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
});
