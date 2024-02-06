import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";


type Props = IButtonProps & {
    title: string;
    variant?: 'solid' | 'outline';

}

export function Button({ title, variant = 'solid', ...rest }: Props) {
    return (
        <ButtonNativeBase
            bg="#00FF89"
            color="black"
            w={200}
            h={60}
            rounded={20}
            _pressed={{
                bg: variant === 'outline' ? '#201B2C' : 'green.600'
            }}

            {...rest}
        >
            <Text
                color={variant === 'outline' ? 'gray.300' : 'black'}
                fontSize={variant === 'outline' ? '14' : '20'}
                fontWeight='bold'

            >
                {title}
            </Text>

        </ButtonNativeBase>
    );
}