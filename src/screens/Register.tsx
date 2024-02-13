import { Box, Center, Heading, ScrollView, Modal, Input, Button, Text, FlatList } from "native-base";

import { RegisterCard } from '@components/RegisterCard'

import NicotinaPng from '@assets/nicotina.png'
import ChocolatePng from '@assets/chocolate.png'
import AlcoolPng from '@assets/alcool.png'
import PlogoPng from '@assets/plogo.png'

import { TouchableOpacity, Alert } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'




export function Register() {

    const [register, setRegister] = useState<string[]>([]);
    const [registerName, setRegisterName] = useState('');

    function handleParticipantAdd() {
        if (!registerName.trim()) {
            return Alert.alert("Nome inválido", "Por favor, digite um nome válido.");
        }
        if (register.includes(registerName)) {
            return Alert.alert("Participante existe", "Já existe esse nome.");
        }
        setRegister(prevState => [...prevState, registerName]);
        setRegisterName(''); // Limpar o input após adicionar o nome
        setModalVisible(false); // Fechar o modal após adicionar o nome
    }

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={12}>
            <Center mb={20} mt={10}>
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


                        <FlatList
                            data={register}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <RegisterCard
                                    key={item}
                                    name={item}
                                     />
                            )}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <Text color="white" mt={32}>Nada encontratado, Adicione!</Text>
                            )}
                        />



                    </Box>
                </ScrollView>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
                    <Modal.Content maxWidth="400px"  >
                        <Modal.CloseButton />
                        <Modal.Header >Adicine Para Monitorar</Modal.Header>
                        <Modal.Body  >

                            <Center>
                                <Input
                                    h={10}
                                    rounded={10}
                                    placeholder={"Digite o nome"}
                                    onChangeText={text => setRegisterName(text)}
                                    value={registerName}
                                    onSubmitEditing={(handleParticipantAdd)}
                                    returnKeyType='send'
                                />
                                <Button
                                    mt={5}
                                    h={10}
                                    bg="#00FF89"
                                    px={10}
                                    _pressed={{
                                        bg: 'green.600'
                                    }}
                                    onPress={handleParticipantAdd}
                                >
                                    <Text fontSize={16} fontWeight={"bold"}>Criar</Text>
                                </Button>
                            </Center>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>

        </ScrollView >
    );
}
