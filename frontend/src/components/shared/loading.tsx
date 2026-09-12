import {Center, Loader, useMantineTheme} from '@mantine/core';

interface Props {
    loading: boolean;
}

export function Loading({loading}: Props) {
    const theme = useMantineTheme();
    return (
        <>
            {loading ?
                <Center>
                    <Loader
                        color={theme.colors.accent[7]}
                        type="dots"
                        size={50}
                    />
                </Center>
                : <></>
            }
        </>
    
    );
}