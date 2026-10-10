import {FoodList} from '../../menu/foodList.tsx';
import {MealList} from '../../menu/mealList.tsx';
import * as React from 'react';

interface TabType {
    id: string,
    label: string,
    content: React.JSX.Element,
}

export const tabsList: TabType[] = [
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
