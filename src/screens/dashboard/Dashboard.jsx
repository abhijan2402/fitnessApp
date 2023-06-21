import React, { useState } from 'react';
import ScreenContainer from '../../components/container/ScreenContainer';
import { View,StyleSheet, Image } from 'react-native';
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

const BASE_TRACKER_CONTAINER_HEIGHT = 350;

function Dashboard(props) {
    const [meals,setMeals] = useState(MEALS[0])
    const [workout,setWorkout] = useState(WORKOUTS[0])
    return (
        <ScreenContainer scroll={true}>
            <View style={styles.profileInfo}>
                <View style={styles.userInfo}>
                    <SmallText>Welcome Back,</SmallText>
                    <TextH4>INZAMAMUL</TextH4>
                </View>
                <SolidButton containerStyle={styles.solidButtonContainer}>
                    <Notification width={30} height={30}/>
                </SolidButton>
            </View>
            <GradientLabel 
                colors={[COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2]}
                conatinerStyle={styles.gradientContainer}
            >
                <View style={styles.bmiContainer}>
                    <View style={{flexGrow:1}}>
                        <TextMedium style={{color:'white'}}>BMI (Body Mass Index)</TextMedium>
                        <SmallText style={{color:'white',marginBottom:15}}>You have a normal weight</SmallText>
                        <SecondaryButton 
                        title={'View More'}
                        containerStyle={{width:100,height:40,elevation:0}}
                        textStyle={{fontSize:12}}
                        />
                    </View>
                    <View>
                        <CustomPieChart/>
                    </View>
                    
                </View>
            </GradientLabel>
            <SolidContainer containerStyle={styles.solidcontainer}>
                <TextMedium style={{flexGrow:1}}>Today Target</TextMedium>
                <PrimaryButton 
                containerStyle={styles.targetButton} 
                textStyle={styles.targetButtonText}
                title={'Check'}/>
            </SolidContainer>
            <LargeText style={{fontFamily:FONTS.FONT_POPPINS_SEMIBOLD,color:'black',marginBottom:15}}>Activity Status</LargeText>
            <SolidContainer containerStyle={styles.lineGraphContainer}>
                <LineGraphWithoutLabel/>
                <PairText 
                    containerStyle={styles.stepContainer}
                    heading={'STEPS'}
                    subHeading='2000'
                />
            </SolidContainer>
            
            <View style={styles.basicTracker}>
                <DataContainer containerStyle={styles.waterIntakeTracker}>
                    <View>
                        <ProgressBar 
                        vertical={true}
                        containerStyle={styles.waterInTakeBar} 
                        gradientContainerStyle={{...styles.waterInTakeGradient,height:(200 % BASE_TRACKER_CONTAINER_HEIGHT)}}
                        />
                    </View>
                    <View style={{alignSelf:'flex-start',paddingTop:15,marginLeft:10}}>
                        <PairText 
                        heading={'Water Intake'}
                        subHeading='4 Liters'
                        />
                        <SmallText style={{marginTop:10,marginBottom:10}}>Real time updates</SmallText>
                        <ListBullet title={'6am - 8am'} subTitle={'600ml'}/>
                        <ListBullet title={'9am - 11am'} subTitle={'500ml'}/>
                        <ListBullet title={'11am - 2pm'} subTitle={'1000ml'}/>
                        <ListBullet title={'2pm - 4pm'} subTitle={'700ml'}/>
                        <ListBullet title={'4pm - now'} subTitle={'900ml'} showLine={false}/>
                    </View>
                </DataContainer>
                <View style={{flexGrow:1,height:BASE_TRACKER_CONTAINER_HEIGHT,marginRight:10}}>
                    <DataContainer containerStyle={styles.sleepContainer}>
                        <PairText
                        heading='Sleep'
                        subHeading='8h 20m'
                        />
                        <Image style={{marginTop:15}} source={require('../../../assets/images/Sleep-Graph.png')}/>
                    </DataContainer>
                    <DataContainer containerStyle={{...styles.sleepContainer,...{marginBottom:0}}}>
                        <PairText
                            heading='Calories'
                            subHeading='760 kCal'
                        />
                        <View style={{alignItems:'center',marginTop:10}}>
                            <CircularRing radius={45} fontSize={11} gap={13} label='230kCal left'/>
                        </View>
                    </DataContainer>
                </View>
                
            </View>
            <SolidContainer containerStyle={{...styles.solidcontainer,backgroundColor:'white',paddingHorizontal:10,marginBottom:0}}>
                <LargeText style={{fontFamily:FONTS.FONT_POPPINS_SEMIBOLD,color:'black',flexGrow:1}}>Today Meals</LargeText>
                <GradientDropdown
                data={MEALS} 
                value={meals} 
                setValue={setMeals}
                placeholder='Select Item'
                containerStyle={{width:150,height:40,borderRadius:30}}
                />    
            </SolidContainer>
            <View style={{paddingHorizontal:10}}>
                <MealContainer
                img={require('../../../assets/images/sushi.png')}
                title={'Salmon Nigiri'}
                time={'7am'}
                date={'Today'}
                />
                <MealContainer
                img={require('../../../assets/images/glass-of-milk.png')}
                title={'Lowfat Milk'}
                time={'8am'}
                date={'Today'}
                />
            </View>
            <SolidContainer containerStyle={{...styles.solidcontainer,backgroundColor:'white',paddingHorizontal:10,marginBottom:0}}>
                <LargeText style={{fontFamily:FONTS.FONT_POPPINS_SEMIBOLD,color:'black',flexGrow:1}}>Workout Progress</LargeText>
                <GradientDropdown
                data={WORKOUTS} 
                value={workout} 
                setValue={setWorkout}
                placeholder='Select Item'
                containerStyle={{width:150,height:40,borderRadius:30}}
                />    
            </SolidContainer>
            <View style={{overflow:'hidden'}}>
            <AnimatedLineChart/>
            </View>
            <SolidContainer containerStyle={{...styles.solidcontainer,backgroundColor:'white',paddingHorizontal:10,marginBottom:0}}>
                <LargeText style={{fontFamily:FONTS.FONT_POPPINS_SEMIBOLD,color:'black',flexGrow:1}}>Workout Progress</LargeText>
                <SmallText style={{fontFamily:FONTS.FONT_POPPINS_MEDIUM}}>See More</SmallText>  
            </SolidContainer>
            <View style={{marginBottom:80,paddingHorizontal:10}}>
                    <WorkoutContainer
                    img={require('../../../assets/images/sushi.png')}
                    imgBackground={COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1}
                    imgStyle={{width:30,height:30}}
                    title={'Fullbody Workout'}
                    time={'20min'}
                    cal={'180 Calories Burn'}
                    />
            </View>
        </ScreenContainer>
    );
}
const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};


const styles = StyleSheet.create({
    solidButtonContainer:{
        width:50,
        height:50,
        borderRadius:15,
    },
    basicTracker:{
        flexDirection:'row'
    },
    stepContainer:{
        position:'absolute',
        left:20,
        top:15
    },
    sleepContainer:{
        flex:1,
        marginLeft:20,
        marginBottom:10,
        flexGrow:1
    },
    waterIntakeTracker:{
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
        height:BASE_TRACKER_CONTAINER_HEIGHT,
        marginBottom:0  
    },
    waterInTakeGradient:{
        height:0,
        position:'absolute',
        bottom:0
    },
    waterInTakeBar:{
        width:30,
        height:BASE_TRACKER_CONTAINER_HEIGHT - 50
    },
    targetButton:{
        width:100,
        height:40,
        elevation:0
    },
    targetButtonText:{
        fontSize:14
    },
    solidcontainer:{
        flexDirection:'row',
        borderRadius:15,
        height:70,
        padding:15,
        paddingHorizontal:20,
        marginTop:30,
        backgroundColor:'rgba(157,206,255,0.2)',
        marginBottom:40
    },
    userInfo:{
        flexGrow:1
    },
    profileInfo:{
        flexDirection:'row',
        marginBottom:30
    },
    lineGraphContainer:{
       borderRadius:15,
       justifyContent:'center',
       alignItems:'center',
       height:'auto',
       backgroundColor:'rgba(157, 206, 255,0.2)',
       marginBottom:15
       
    },
    gradientContainer:{
        width:'100%',
        height:180,
        borderRadius:15,
        elevation:5,
        padding:30
    },
    bmiContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    
})
export default Dashboard;