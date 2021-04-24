import React from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'; //Cores pré definidas
import fonts from '../styles/fonts'; //Fontes pré definidas



export function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil.
                </Text>

                <Image
                    source={wateringImg}
                    style={style.image}
                    resizeMode="contain" //Imagem responsiva.
                />

                <Text style={style.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity
                    style={style.button}
                    activeOpacity={0.3}
                    onPress={handleStart}
                >

                    <Feather
                        name="chevron-right"
                        style={style.buttonIcon}
                    />

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,

    },

    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },

    image: {
        height: Dimensions.get('window').width * 0.7 //Deixa a imagem responsiva.
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 50,
        width: 50,

    },

    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }

})

