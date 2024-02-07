import { Box, Center, Heading, ScrollView } from "native-base";

import { RegisterCard } from '@components/RegisterCard'

import NicotinaPng from '@assets/nicotina.png'
import ChocolatePng from '@assets/chocolate.png'
import AlcoolPng from '@assets/alcool.png'
import PlogoPng from '@assets/plogo.png'

export function Register() {
    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={12}>
            <Center>
                <Box bg="#2F2841" h="full" w={340} rounded={20} alignItems='center' p={5}>
                    <Heading color="#00FF89" mt={5} mb={10}>
                        Comprometo-me a parar:
                    </Heading>

                    <RegisterCard
                        title="Nicotina"
                        source={NicotinaPng}
                    />
                    <RegisterCard
                        title="Chocolate"
                        source={ChocolatePng}
                    />
                    <RegisterCard
                        title="Álcool"
                        source={AlcoolPng}
                    />
                    <RegisterCard
                        title="Pornografia"
                        source={PlogoPng}
                    />
                </Box>
            </Center>

        </ScrollView>
    );
}