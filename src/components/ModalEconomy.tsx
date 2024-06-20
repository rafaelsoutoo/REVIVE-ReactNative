import React, { useState } from 'react';
import { Center, Modal, Text, Button, Input } from "native-base";
import { useAuth } from '@hooks/useAuth';
import { number } from 'yup';

type ModalEconomyProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function ModalEconomy({ isOpen, onClose }: ModalEconomyProps) {
    const { user } = useAuth();


    const [unitPrice, setUnitPrice] = useState('');

    const formatUnitPrice = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        const formattedValue = `R$ ${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        return formattedValue;
    };
    

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
                            placeholder="Digite a qunatidade"
                            focusOutlineColor="#00FF89"
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
                            placeholder="Digite a qunatidade"
                            focusOutlineColor="#00FF89"
                            value={unitPrice}
                            onChangeText={(text) => setUnitPrice(formatUnitPrice(text))}
                        />
                        <Button
                            mt={5}
                            h={10}
                            bg="#00FF89"
                            px={10}
                            _pressed={{ bg: 'green.600' }}
                            onPress={onClose}
                        >
                            <Text fontSize={16} fontWeight="bold">Confirmar</Text>
                        </Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}
