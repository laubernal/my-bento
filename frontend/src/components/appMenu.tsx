import { AppTabs } from './shared/appTabs.tsx';
import {
    useMantineTheme,
    Box,
    Title
} from '@mantine/core';

export function AppMenu() {
    const theme = useMantineTheme();

    return (
        <Box
            component="header"
            px={{ base: 16, sm: 32 }}
            pt={{ base: 24, sm: 32 }}
            pb={{ base: 16, sm: 24 }}
            style={{
                borderBottom: `1px solid ${theme.colors.warm[4]}`,
                backgroundColor: theme.colors.warm[0],
            }}
        >
            <Box
                maw={1400}
                mx="auto"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    alignItems: 'stretch',
                }}
                className="sm:flex-row sm:items-end sm:gap-6"
            >
                <Box style={{ flex: 1 }}>
                    <Title
                        order={1}
                        ff="Fraunces"
                        fz={{ base: 24, sm: 30 }}
                        fw={600}
                        c={theme.colors.warm[9]}
                        style={{ letterSpacing: '-0.025em' }}
                    >
                        My Bento
                    </Title>
                </Box>
                <AppTabs />
            </Box>
        </Box>
    );
}