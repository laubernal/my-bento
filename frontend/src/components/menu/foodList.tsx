import {Loading} from '../shared/loading.tsx';
import {Grid, Space, Text, Title} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getFoods} from '../../api/foods.ts';
import type {Food} from '../../api/types.ts';

function groupFoodsByCategory(foods: Food[]): Record<string, Food[]> {
    return foods.reduce<Record<string, Food[]>>((groups, food) => {
        (groups[food.category] ??= []).push(food);
        return groups;
    }, {});
}

export function FoodList() {
    const {data, loading, error} = useApi(getFoods);
    
    const foods = data ? data : [];
    const foodsGroupedByCategory = Object.entries(groupFoodsByCategory(foods));
    
    return (
        <>
            <Title>Foods</Title>
            
            <Space h="lg"></Space>
            
            <Loading loading={loading}/>
            
            {!foods.length
                ? <Text size="xl">No foods found</Text>
                : <Grid>
                    {foodsGroupedByCategory.map(([category, categoryFoods]) => {
                        const categoryEmoji = category.toLowerCase() === 'proteína' ? '🥩' : '🥖';
                        
                        return (
                            <Grid.Col span={foodsGroupedByCategory.length * 2} key={category}>
                                <div>
                                    <Title order={3}>{categoryEmoji} {category}</Title>
                                    {categoryFoods.map((food) => (
                                        <div key={food.id}>
                                            <div>{food.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </Grid.Col>
                        );
                    })}
                
                </Grid>
                
            }
            
            {
                error && <p>{error}</p>
            }
        </>
    );
}