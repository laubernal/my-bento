import {Center, Loader} from '@mantine/core';

interface Props {
    loading: boolean;
}

export function Loading({loading}: Props) {
    return (
        <>
            {loading ?
                <Center>
                    <Loader
                        color="teal"
                        type="dots"
                        size={50}
                    />
                </Center>
                : <></>
            }
        
        </>
    
    );
}