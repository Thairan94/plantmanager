import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,

} from 'react-native';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker';
import { SvgFromUri } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/core';
import { Button } from '../components/Button';
import { isBefore, format } from 'date-fns';
import { PlantProps, savePlant, loadPlants } from '../libs/storage';


import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';




interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation()

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        //Se é uma data antiga.
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⌚');
        }

        //Se não é uma data antiga.
        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDatetimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });


        } catch {
            Alert.alert('Não foi possível salvar.')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.container}
        >
            <View style={style.container}>
                <View style={style.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={style.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={style.plantAbout}>
                        {plant.about}

                    </Text>
                </View>

                <View style={style.controller}>
                    <View style={style.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={style.tipImage}
                        />
                        <Text style={style.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={style.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDatePicker && (

                        <DataTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />

                    )}

                    {

                        Platform.OS == 'android' && (
                            <TouchableOpacity
                                style={style.button}
                                onPress={handleOpenDatetimePickerForAndroid}
                            >
                                <Text style={style.dataTimeText}>
                                    {` Mudar Horário ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }




                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dataTimeText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
})