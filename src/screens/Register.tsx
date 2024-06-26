import React, { useState, useEffect } from 'react';
import { Box, Center, Heading, Modal, Input, Button, Text, ScrollView, useToast, VStack, HStack, Switch } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RegisterCard } from '../components/RegisterCard';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { RegisterDTO } from '@dtos/RegisterDTO';
import { useAuth } from '@hooks/useAuth';
import { ModalEconomy } from '@components/ModalEconomy';  

export function Register() {
    const [isLoading, setIsLoading] = useState(true);

    const [vice, setVice] = useState<RegisterDTO[]>([]);
    const [registerName, setRegisterName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const [optionSelect, setOptionSlect] = useState(false);

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const toast = useToast();
    const { user } = useAuth();

    useEffect(() => {
        fetchVices();
    }, [user]);

    async function handleCreateVice() {
        try {
            if (vice.some(item => item.name.toLowerCase() === registerName.toLowerCase())) {
                return toast.show({
                    title: "Nome já existe",
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
            const userId = user.id;
            await api.post(`/create/vice/${userId}`, { name: registerName });

            toast.show({
                title: 'Parabéns! Vício adicionado com sucesso.',
                placement: 'top',
                bgColor: 'green.500'
            });

            setModalVisible(false);
            if(!optionSelect){
                navigation.navigate("meta")
            }

            if (optionSelect) {
                setSecondModalVisible(true);
            }

            fetchVices();
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar o vício.';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setRegisterName('');
            setOptionSlect(false); 
        }
    }

    async function fetchVices() {
        try {
            setIsLoading(true);

            const userId = user.id;
            const response = await api.get(`/get/vice/${userId}`);
            setVice(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.log('não possui registros');
            } else {
                const isAppError = error instanceof AppError;
                const title = isAppError ? error.message : 'Não foi possível carregar os seus registros';
                toast.show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ScrollView backgroundColor="#201B2C" flex={1} p={5} showsVerticalScrollIndicator={false}>
            <Center mb={20} mt={10}>
                <Box bg="#2F2841" h="full" w="100%" rounded={20} alignItems='center' p={5} minH={600} mt={5}>
                    <Heading color="#00FF89" mt={5} mb={5}>
                        Comprometo-me a parar:
                    </Heading>

                    <TouchableOpacity style={{ marginLeft: 200, marginBottom: 16 }} onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="library-add" size={45} color="#00FF89" />
                    </TouchableOpacity>

                    {isLoading ? (
                        <Text color="white" mt={32}>Carregando...</Text>
                    ) : (
                        <VStack space={4} alignItems="center" width="100%">
                            {vice.length === 0 ? (
                                <Text color="white" fontWeight="bold" mt={32}>Nada encontrado, Adicione!</Text>
                            ) : (
                                vice.map((item) => (
                                    <RegisterCard key={item.id} data={item} />
                                ))
                            )}
                        </VStack>
                    )}
                </Box>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Modal.Content mb={150}>
                        <Modal.CloseButton />
                        <Modal.Header>Adicione Para Monitorar</Modal.Header>
                        <Modal.Body>
                            <Center>
                                <Input
                                    h={10}
                                    rounded={10}
                                    placeholder="Digite o nome"
                                    focusOutlineColor="#00FF89"
                                    onChangeText={text => setRegisterName(text)}
                                    value={registerName}
                                />
                                <Button
                                    mt={5}
                                    h={10}
                                    bg="#00FF89"
                                    px={10}
                                    _pressed={{ bg: 'green.600' }}
                                    onPress={handleCreateVice}
                                >
                                    <Text fontSize={16} fontWeight="bold">Criar</Text>
                                </Button>

                                <Text mt={5} fontSize={16}>Deseja monitorar os gastos?</Text>
                                <HStack>
                                    <Text mt={4}>Não</Text>
                                    <Switch
                                        colorScheme="emerald"
                                        size="lg"
                                        isChecked={optionSelect}
                                        onToggle={() => setOptionSlect(!optionSelect)}
                                    />
                                    <Text mt={4}>Sim</Text>
                                </HStack>
                            </Center>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                <ModalEconomy
                    isOpen={secondModalVisible}
                    onClose={() => setSecondModalVisible(false)}
                />
            </Center>
        </ScrollView>
    );
}
