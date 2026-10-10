import { useState } from 'react';
import { tabsList } from './tabs/appTabs.tsx';
import styles from './tabs/appTabs.module.css';
import {
    useMantineTheme,
    Box,
    Flex,
    Tabs,
    Title
} from '@mantine/core';

export function Header() {
    const theme = useMantineTheme();
    const [activeTab, setActiveTab] = useState<string | null>(tabsList[0].id);
    
    return (
        <Tabs variant="none" value={activeTab} onChange={setActiveTab}>
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
                <Flex
                    maw={1400}
                    mx="auto"
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align={{ base: 'stretch', sm: 'flex-end' }}
                    gap={24}
                >
                    <Title
                        order={1}
                        ff="Fraunces"
                        fz={{ base: 24, sm: 30 }}
                        fw={600}
                        c={theme.colors.warm[9]}
                        style={{ letterSpacing: '-0.025em' }}
                    >
                        🍱 My Bento
                    </Title>
                    
                    <Tabs.List className={styles.list}>
                        {tabsList.map((tab) => (
                            <Tabs.Tab key={tab.id} value={tab.id} className={styles.tab}>
                                {tab.label}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Flex>
            </Box>
            
            <Box
                maw={1400}
                mx="auto"
                px={{ base: 16, sm: 32 }}
                py={{ base: 16, sm: 24 }}
            >
                {tabsList.map((tab) => (
                    <Tabs.Panel value={tab.id} key={tab.id}>
                        {tab.content}
                    </Tabs.Panel>
                ))}
            </Box>
        </Tabs>
    );
}
