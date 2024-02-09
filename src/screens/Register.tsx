import { Box, Center, Heading, ScrollView, Modal, Select, Input, Button, Text } from "native-base";

import { RegisterCard } from '@components/RegisterCard'

import NicotinaPng from '@assets/nicotina.png'
import ChocolatePng from '@assets/chocolate.png'
import AlcoolPng from '@assets/alcool.png'
import PlogoPng from '@assets/plogo.png'

import { TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'




export function Register() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={12}>
            <Center mb={20}>
                <ScrollView >
                    <Box bg="#2F2841" h="full" w="100%" rounded={20} alignItems='center' p={5} minH={600} >
                        <Heading color="#00FF89" mt={5} mb={5}>
                            Comprometo-me a parar:
                        </Heading>

                        <TouchableOpacity style={{ marginLeft: 200, marginBottom: 16 }} onPress={() => setModalVisible(true)}>
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


                    </Box>
                </ScrollView>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
                    <Modal.Content maxWidth="400px"  >
                        <Modal.CloseButton />
                        <Modal.Header  >Adicine Para Monitorar</Modal.Header>
                        <Modal.Body  >
                            <Select
                                minWidth="200"
                                accessibilityLabel="O que deseja monitorar?"
                                placeholder="O que deseja monitorar?"
                                mt={1}
                                mb={5}
                            >
                                <Select.Item label="Uma Abstinência" value="abs" />
                                <Select.Item label="Um Vício" value="vicio" />
                            </Select>
                            <Center>
                                <Input h={10} rounded={10} placeholder={"Digite o nome"}  >
                                </Input>
                                <Button
                                    mt={5}
                                    h={10}
                                    bg="#00FF89"
                                    px={10}
                                    _pressed={{
                                        bg:'green.600'
                                    }}
                                >
                                    <Text fontSize={15} fontWeight={"bold"}>Criar</Text>
                                </Button>
                            </Center>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>

        </ScrollView >
    );
}
