import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {

    return (
        <NativeBaseInput
            fontSize={18}
            fontFamily={"body"}
            p={4}
            mb={5}
            mx={5}
            rounded={20}
            bg="#514869"
            color="gray.300"
            borderColor="#514869"
            _focus={{
                bg: "#201B2C",
                borderColor: 'green.500'
            }}


            {...rest}
        />
    );
}