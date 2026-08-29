import type {MealDto} from '../../api/types.ts';
import {Loading} from '../shared/loading.tsx';
import {Grid, Text, Title} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getMeals} from '../../api/meals.ts';

function groupMealsByType(meals: MealDto[]): Record<string, MealDto[]> {
    return meals.reduce<Record<string, MealDto[]>>((groups, meal) => {
        (groups[meal.type] ??= []).push(meal);
        return groups;
    }, {});
}

export function MealList() {
    const {data, loading, error} = useApi(getMeals);
    
    const meals = data ? data.data : [];
    const mealsGroupedByType = Object.entries(groupMealsByType(meals));
    
    return (
        <>
            <Title>
                Meals
            </Title>
            <Loading loading={loading}/>
            {!mealsGroupedByType.length
                ? <Text size='xl'>No meals found</Text>
                : <Grid>
                    {mealsGroupedByType.map(([type, typeMeals]) => {
                        const typeEmoji = type.toLowerCase() === 'dinner' ? '🌃' : '☀️';
                        
                        return (
                            <Grid.Col span={mealsGroupedByType.length * 2} key={type}>
                                <div>
                                    <Title order={3}>{typeEmoji} {type}</Title>
                                    {typeMeals.map((meal) => (
                                        <div key={meal.id}>
                                            <Text size='md'>{meal.name}</Text>
                                        </div>
                                    ))}
                                </div>
                            </Grid.Col>
                        );
                    })}
                </Grid>
                
                
            }
            
            {error && <p>{error}</p>}
        </>
    );
}