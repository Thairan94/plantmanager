import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SvgFromUri } from 'react-native-svg'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';


interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string
    };
    handleRemove: () => void //Tipagem de função.
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest }: PlantProps) => {
    return (
        <Swipeable
            overshootRight={false} //Trava o movimento para a direita.
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={style.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white} />

                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={style.container}
                {...rest}
            >
                <SvgFromUri uri={data.photo} width={50} height={50} />
                <Text style={style.text}>
                    {data.name}
                </Text>
                <View style={style.details}>
                    <Text style={style.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={style.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
})