import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Center, ScrollView, Box, VStack, Image, Heading } from "native-base";

import { HeadingMeta } from '@components/HeadingMeta';
import NicotinaGreenPng from '@assets/nicotinaGreen.png';
import Group2x from '@assets/Group2x.png';
import { Button } from "@components/Button";


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    pagination: {
        bottom: 765, 
    },
});

const NicotinaSlide = () => (
    <View style={styles.slide}>
        <Box w="100%" rounded={20} borderColor="#00FF89" borderWidth={1}>
            <VStack bg="#2F2841" rounded={20} p={4}>
                <Center>    
                    <HeadingMeta title="Nicotina"  />
                    <Image source={Group2x} alt="imagem principal" mt={12} mb={10} />
                    <Heading color="#00FF89" mb={3}>Tempo de abstinência</Heading>
                    <Heading color="white">256d 12h 22m 1s</Heading>
                    <Heading color="#00FF89" mb={3} mt={12}>Valor economizado</Heading>
                    <Heading color="white">R$ 1.321,85</Heading>
                    <Button title="Recaída" mt={16} mb={10} />
                </Center>
            </VStack>
        </Box>
    </View>
);
const RedioSlide = () => (
    <View style={styles.slide}>
        <Box w="100%" rounded={20}  borderColor="#00FF89" borderWidth={1}>
            <VStack bg="#2F2841" rounded={20} p={4}>
                <Center>
                    <HeadingMeta title="Radio"  />
                    <Image source={Group2x} alt="imagem principal" mt={12} mb={10} />
                    <Heading color="#00FF89" mb={3}>Tempo de abstinência</Heading>
                    <Heading color="white">256d 12h 22m 1s</Heading>
                    <Heading color="#00FF89" mb={3} mt={12}>Valor economizado</Heading>
                    <Heading color="white">R$ 1.321,85</Heading>
                    <Button title="Recaída" mt={16} mb={10} />
                </Center>
            </VStack>
        </Box>
    </View>
);

const AlcoolSlide = () => (
    <View style={styles.slide}>
        <Box w="100%" rounded={20} borderColor="#00FF89" borderWidth={1}>
            <VStack bg="#2F2841" rounded={20} p={4}>
                <Center>
                    <HeadingMeta title="Álcool" />
                    <Image source={Group2x} alt="imagem principal" mt={12} mb={10} />
                    <Heading color="#00FF89" mb={3}>Tempo de abstinência</Heading>
                    <Heading color="white">128d 5h 18m 45s</Heading>
                    <Heading color="#00FF89" mb={3} mt={12}>Valor economizado</Heading>
                    <Heading color="white">R$ 950,50</Heading>
                    <Button title="Recaída" mt={16} mb={10} />
                </Center>
            </VStack>
        </Box>
    </View>
);

export function Meta() {
    return (
      <View style={{backgroundColor:"#201B2C"}} >
        <ScrollView showsVerticalScrollIndicator={false}>
            <Center px={4}>
                <Swiper
                     style={styles.wrapper}
                     showsButtons={false}
                     paginationStyle={styles.pagination}
                     activeDotColor="#00FF89"
                >
                    <NicotinaSlide />
                    <AlcoolSlide />
                    <RedioSlide/>
                </Swiper>
            </Center>
        </ScrollView>

      </View>

    );
}

