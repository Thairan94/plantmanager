import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import useImg from '../assets/iam.jpg'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStorageUserName();
    }, [])

    return (
        <View style={style.container} >
            <View>
                <Text style={style.greeting}>Olá,</Text>
                <Text style={style.userName}> {userName} </Text>
            </View>
            <Image source={useImg} style={style.image} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 30,


    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },

    greeting: {
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading,
        marginLeft: 9.5
    },

    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
        marginLeft: 7
    }
})