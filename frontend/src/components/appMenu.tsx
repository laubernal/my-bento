import { Tabs } from '@mantine/core';
import {FoodList} from './menu/foodList.tsx';
import * as React from 'react';
import {MealList} from './menu/mealList.tsx';

interface tabType {
    id: string,
    label: string,
    content: React.JSX.Element,
}

const tabsList = [
    {
        id: 'foods',
        label: 'Foods',
        content: <FoodList />
    },
    {
        id: 'meals',
        label: 'Meals',
        content: <MealList />
    },
];

export function AppMenu() {
    const [activeTab, setActiveTab] = React.useState<string | null>(tabsList[0].id);
    
    return (
        <Tabs variant="outline" radius="lg" value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
                {tabsList.map((tab: tabType) => {
                    return (
                        <Tabs.Tab value={tab.id}>{tab.label}</Tabs.Tab>
                    )
                })}
            </Tabs.List>
            
            {tabsList.map((tab: tabType) => {
                return (
                    <Tabs.Panel value={tab.id}>{tab.content}</Tabs.Panel>
                )
            })}
            
        </Tabs>
    );
}