import {Center, Loader} from '@mantine/core';

export function Loading() {
    return (
        <Center>
            <Loader
                color="teal"
                type="dots"
                size={50}
            />
        </Center>
    );
}