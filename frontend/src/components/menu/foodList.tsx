import {Loading} from '../shared/loading.tsx';
import {Title} from '@mantine/core';
import {useApi} from '../../hooks/useApi.ts';
import {getFoods} from '../../api/foods.ts';
import type {Food} from '../../api/types.ts';

export function FoodList() {
    const {data, loading, error} = useApi(getFoods);

    const foods = data ? data : [];
    
    return (
        <>
            <Title>
                Foods
            </Title>
            <Loading loading={loading} />
            {foods
                ? foods.map((food: Food) => {
                    const categoryEmoji = food.category.toLowerCase() === 'proteína' ? '🥩' : '🥖';
                    
                    return (
                        <div key={food.id}>
                            <div>{food.name} - {categoryEmoji}</div>
                        </div>);
                })
                : <>No foods found</>
            }
            
            {error && <p>{error}</p>}
        </>
    );
}