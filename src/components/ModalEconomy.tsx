import React, { useState } from 'react';
import { Center, Modal, Text, Button, Input, useToast } from "native-base";
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

type ModalEconomyProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function ModalEconomy({ isOpen, onClose }: ModalEconomyProps) {
    const { user } = useAuth();
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const [unitPrice, setUnitPrice] = useState('');
    const [amountPrice, setAmountPrice] = useState('');

    const formatUnitPrice = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        const formattedValue = `R$ ${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
        return formattedValue;
    };

    const parseAmountPrice = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        return parseInt(numericValue, 10);
    };

    async function handleCreateEconomy() {
        try {
            const unit = parseInt(unitPrice, 10);
            const originalAmount = parseAmountPrice(amountPrice);

            if (isNaN(unit) || isNaN(originalAmount) || originalAmount <= 0) {
                toast.show({
                    title: 'Por favor, insira valores válidos.',
                    placement: 'top',
                    bgColor: 'red.500'
                });
                return;
            }

            await api.post('/create/economy', {
                unit,
                originalAmount
            });


            toast.show({
                title: 'Economia registrada com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            });

            navigation.navigate('meta')

            onClose();
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar a economia.';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content mb={150}>
                <Modal.CloseButton />
                <Modal.Header>Calcular Gastos</Modal.Header>
                <Modal.Body>
                    <Center>
                        <Text>
                            Quantas Unidades você consome por semana?
                        </Text>
                        <Input
                            mt={1}
                            keyboardType='numeric'
                            h={10}
                            w={"90%"}
                            rounded={10}
                            placeholder="Digite a quantidade"
                            focusOutlineColor="#00FF89"
                            value={unitPrice}
                            onChangeText={(text) => setUnitPrice(text)}
                        />
                        <Text mt={5}>
                            Qual valor de cada unidade?
                        </Text>
                        <Input
                            mt={1}
                            keyboardType='numeric'
                            h={10}
                            w={"90%"}
                            rounded={10}
                            placeholder="Digite o valor"
                            focusOutlineColor="#00FF89"
                            value={amountPrice}
                            onChangeText={(text) => setAmountPrice(formatUnitPrice(text))}
                        />
                        <Button
                            mt={5}
                            h={10}
                            bg="#00FF89"
                            px={10}
                            _pressed={{ bg: 'green.600' }}
                            onPress={handleCreateEconomy}
                        >
                            <Text fontSize={16} fontWeight="bold">Confirmar</Text>
                        </Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}
