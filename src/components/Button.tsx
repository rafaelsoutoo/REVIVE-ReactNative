import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";


type Props = IButtonProps & {
    title: string;

}

export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            mt={10}
            bg="#00FF89"
            color="black"
            w={200}
            h={60}
            rounded={20}
            _pressed={{
                bg: "green.400" 
              }}

            {...rest}
        >
            <Text
                color="black"
                fontSize={20}
                fontWeight='bold'
                
            >
                {title}
            </Text>

        </ButtonNativeBase>
    );
}