import { Box, Center, Heading, ScrollView } from "native-base";

import { RegisterCard } from '@components/RegisterCard'

import NicotinaPng from '@assets/nicotina.png'
import ChocolatePng from '@assets/chocolate.png'
import AlcoolPng from '@assets/alcool.png'
import PlogoPng from '@assets/plogo.png'

import { TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

export function Register() {
    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={10}>
            <Center p={6} mb={10}>
                <ScrollView >
                    <Box bg="#2F2841" h="full" w="100%" rounded={20} alignItems='center' p={8} minH={600} >
                        <Heading color="#00FF89" mt={5} mb={5}>
                            Comprometo-me a parar:
                        </Heading>

                        <TouchableOpacity style={{ marginLeft: 200, marginBottom: 16 }}>
                            <MaterialIcons
                                name="library-add"
                                size={45} color="#00FF89"
                            />
                        </TouchableOpacity>


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

<RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />
                        <RegisterCard
                            title="Pornografia"
                            source={PlogoPng}
                        />


                        

                    </Box>
                </ScrollView>
            </Center>

        </ScrollView>
    );
}