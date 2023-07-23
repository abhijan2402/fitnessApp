import { StyleSheet, Text, View, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native'
import PrimaryButton from '../../components/Button/PrimaryButton';
import Input from '../../components/Form/Input';
import SmallText from '../../components/Text/SmallText';
import TextH4 from '../../components/Text/TextH4';
import Email from '../../../assets/icons/email.svg';
import Pass from '../../../assets/icons/Pass.svg';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SCREENS } from '../../constants/Screens';
import { GlobalContext } from '../../../App';
import { useContext } from 'react';
import { useState } from 'react';
import { loginUser } from '../../backend/utilFunctions';
import { storeDataInAsyncStorage } from '../../utils/common';
import { storageKeyName } from '../../constants/Data';
import CustomToast from '../../components/common/Toast';
import { useRef } from 'react';

const { width, height } = Dimensions.get('window');



const Login = () => {
    const navigation = useNavigation();
    const { setLoggedInUser } = useContext(GlobalContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");
    const [loading,setLoading]=useState(false)
    const childRef = useRef(null);
    const [toastColorState, setToastColorState] = useState('');
    const [toastTextColorState, setToastTextColorState] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    function onLogin(){
        try {
            if(email==='')
                throw "Enter Email";
            if(password==='')
                throw "Enter password";
            const credentials = {email,password}
            setLoading(true)
            loginUser(credentials)
            .then(res=>{
                storeDataInAsyncStorage(storageKeyName,res.data.token)
                .then(res=>{throw 'Stored in async storage'})
                .catch(err=>{throw 'something went wrong while storing the token'})
            })
            .catch(err=>console.log(err))
            .finally(()=>setLoading(false))
        } catch (error) {
            setToastMessage(error);
            setToastTextColorState("white");
            setToastColorState("red");
            childRef.current.showToast()
            setLoading(false)
        }
    }
    
    return (
        <View style={styles.MainView}>
            <CustomToast
                toastColor={toastColorState}
                toastTextColor={toastTextColorState}
                toastMessage={toastMessage}
                ref={childRef}
            />
            <View style={styles.Heading}>
                <SmallText style={{ fontWeight: "700", color: "black", fontSize: 16, }}>Hey there,</SmallText>
                <TextH4 style={{ marginTop: 7 }}>Welcome Back</TextH4>
            </View>
            <View style={{ width: "85%", marginTop: 7 }}>
                <Input placeholder={"Email"} onChangeText={(value) => setEmail(value)} icon={<Email width={20} height={20} />} />
            </View>
            <View style={{ width: "85%", marginTop: 15 }}>
                <Input placeholder={"Password"} onChangeText={(value) => setPassword(value)} icon={<Pass width={20} height={20} />} />
            </View>
            <View style={{ alignItems: "center", marginTop: "25%" }}>
                {
                    loading?
                    <ActivityIndicator size={30}color={'blue'} />:
                    <PrimaryButton containerStyle={{ width: width - 30, }} title={'Login'} onPress={() => onLogin()} />
                }
            </View>
            <Text style={{ marginTop: "14%" }}>Or</Text>
            <View style={[styles.IconView, { marginTop: "5%" }]}>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/300/300221.png" }} style={styles.icon} />
                </View>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/4922/4922978.png" }} style={styles.icon} />
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate(SCREENS.REGISTER)} style={[styles.IconView, { alignItems: "center" }]}>
                <SmallText style={{ fontSize: 14 }}>Don't have an account yet?</SmallText>
                <TextH4 style={{ fontSize: 14, color: "#C58BF2", marginLeft: 5 }}>Register</TextH4>
            </Pressable>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center"
    },
    Heading: {
        height: height / 9,
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%"
    },
    icon: {
        width: 30,
        height: 30
    },
    IconView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: "#DDDADA",
        padding: 8,
        borderRadius: 8,
        marginHorizontal: 30
    },
    InputOTP: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginHorizontal: 10,
    },
    OTPInput: {
        borderRadius: 10,
        paddingHorizontal: 18,
        backgroundColor: "#ECF2FF",
        textAlign: 'center',
    }
})