import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import { SIZES } from '../../constants/Size';
import { COLORS } from '../../constants/Colors';


function Input({ value, onChangeText, customStyle, icon, placeholder, keyboardType = "default", maxlength, editable }) {
    return (
        <View style={[styles.container, customStyle]}>
            <View style={styles.imageContainer}>
                {icon}
            </View>
            <TextInput
                editable={editable}
                keyboardType={keyboardType}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.TITLE_BLACK}
                maxLength={maxlength}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SIZES.INPUT_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: '#F7F8F8'
    },
    imageContainer: {
        marginLeft: 20
    },
    input: {
        flexGrow: 1,
        marginLeft: 10,
        height: 65,
        fontFamily: FONTS.FONT_POPPINS_MEDIUM,
        fontSize: SIZES.INPUT_FONT_SIZE,
        color: COLORS.TITLE_BLACK
    }
})
export default Input;