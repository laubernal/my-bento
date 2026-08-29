import {Loading} from '../shared/loading.tsx';
import {
    Button,
    Grid,
    Space,
    Text,
    Title
} from '@mantine/core';
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
            <Space h='sm'></Space>
            
            <Grid grow>
                <Grid.Col span={10} >
                    <Title>Foods</Title>
                </Grid.Col>
                
                <Grid.Col span={0} >
                    <Button variant='filled'>Add food</Button>
                </Grid.Col>
            </Grid>
            
            <Space h='lg'></Space>
            
            <Loading loading={loading}/>
            
            {!foodsGroupedByCategory.length
                ? <Text size='xl'>No foods found</Text>
                : <Grid>
                    {foodsGroupedByCategory.map(([category, categoryFoods]) => {
                        const categoryEmoji = category.toLowerCase() === 'proteína' ? '🥩' : '🥖';
                        
                        return (
                            <Grid.Col span={foodsGroupedByCategory.length * 2} key={category}>
                                <div>
                                    <Title order={3}>{categoryEmoji} {category}</Title>
                                    {categoryFoods.map((food) => (
                                        <div key={food.id}>
                                            <Text size='md'>{food.name}</Text>
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