import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Box, VStack, Image, Heading } from "native-base";
import { HeadingMeta } from '@components/HeadingMeta';
import Group2x from '@assets/Group2x.png';
import { Button } from "@components/Button";
import { RegisterDTO } from '@dtos/RegisterDTO';

const { width } = Dimensions.get('window'); 

type Props = {
    data: RegisterDTO,
    amount: string | null,
    time: string,
    onResetTime: () => void;
};

const styles = StyleSheet.create({
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 40,
        marginTop: 20,
        marginHorizontal: 10
    },
    box: {
        width: width - 50, 
        height: "100%",
        borderRadius: 20,
        borderColor: "#00FF89",
        borderWidth: 1,
        backgroundColor: "#2F2841",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: 12,
        marginBottom: 10,
    },
    heading: {
        color: "#00FF89",
        marginBottom: 3,
    },
    value: {
        color: "white",
    },
    button: {
        marginTop: 16,
        marginBottom: 10,
    },
});

export const SlideMeta = ({ data, time, amount, onResetTime }: Props) => {
    return (
        <View style={styles.slide}>
            <Box style={styles.box}>
                <VStack space={4} alignItems="center">
                    <HeadingMeta title={data.name} />
                    <Image source={Group2x} alt="Imagem principal" style={styles.image} />
                    <Heading style={styles.heading}>Tempo de abstinência</Heading>
                    <Heading style={styles.value}>{time}</Heading>
                    {amount && ( 
                        <>
                            <Heading style={[styles.heading, { marginTop: 12 }]}>Valor economizado</Heading>
                            <Heading style={styles.value}>{amount}</Heading>
                        </>
                    )}
                    <Button title="Recaída" style={styles.button} onPress={onResetTime} />
                </VStack>
            </Box>
        </View>
    );
}
