import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';


export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true)
    }
    //Identifica toda vez se o input muda.
    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }



    async function handleSubmit() {
        if (!name)
            return Alert.alert('Diga-me como posso chamá-lo 😥');

        try {
            await AsyncStorage.setItem('@plantmanager:user', name) //Obter a chave de usuário.
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch{
            Alert.alert('Não foi possível salvar o nome do usuário. 😥');
        }


    }

    return (
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.content}>
                        <View style={style.form}>
                            <View style={style.header}>
                                <Text style={style.emoji}>
                                    {isFilled ? '😁' : '😃'}
                                </Text>

                                <Text style={style.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    style.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={style.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },

    header: {
        alignItems: 'center'
    },

    emoji: {
        fontSize: 44
    },

    title: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    }
});