import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';


type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid;
    return (
        <FormControl isInvalid={invalid} >
            <NativeBaseInput
                fontSize={18}
                fontFamily={"body"}
                p={4}
                mb={4}
                //mx={5}
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

            <FormControl.ErrorMessage _text={{ color: "red.500", marginLeft: 10 , mt:-7}} >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}