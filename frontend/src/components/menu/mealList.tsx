import type {MealDto} from '../../api/types.ts';
import {Loading} from '../shared/loading.tsx';
import {Title, Text} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getMeals} from '../../api/meals.ts';

export function MealList() {
    const {data, loading, error} = useApi(getMeals);
    
    const meals = data ? data.data : [];
    
    return (
        <>
            <Title>
                Meals
            </Title>
            <Loading loading={loading}/>
            {!meals.length
                ? <Text size="xl">No meals found</Text>
                : meals.map((meal: MealDto) => {
                    const categoryEmoji = meal.type.toLowerCase() === 'dinner' ? '🌃' : '☀️';

                    return (
                        <div key={meal.id}>
                            <div>{meal.name} - {categoryEmoji}</div>
                        </div>);
                })
                
            }
            
            {error && <p>{error}</p>}
        </>
    );
}