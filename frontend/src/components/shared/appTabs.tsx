import { useState } from 'react';
import { Tabs } from '@mantine/core';
import styles from './appTabs.module.css';
import {FoodList} from '../menu/foodList.tsx';
import {MealList} from '../menu/mealList.tsx';
import * as React from 'react';

interface tabType {
    id: string,
    label: string,
    content: React.JSX.Element,
}

const tabsList = [
    {
        id: 'menus',
        label: 'Menus',
        content: <>Menus</>
    },
    {
        id: 'meals',
        label: 'Meals',
        content: <MealList />
    },
    {
        id: 'foods',
        label: 'Foods',
        content: <FoodList />
    },
];

export function AppTabs() {
    const [activeTab, setActiveTab] = useState<string | null>(tabsList[0].id);

    return (
        <Tabs variant="none" value={activeTab} onChange={setActiveTab}>
            <Tabs.List className={styles.list}>
                {tabsList.map((tab) => (
                    <Tabs.Tab key={tab.id} value={tab.id} className={styles.tab}>
                        {tab.label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            
            {tabsList.map((tab: tabType) => {
                return (
                    <Tabs.Panel value={tab.id} key={tab.id}>{tab.content}</Tabs.Panel>
                )
            })}
        </Tabs>
    );
}
