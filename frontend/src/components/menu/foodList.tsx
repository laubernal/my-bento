import type {Food} from '../../api/types.ts';
import {Loading} from '../shared/loading.tsx';
import {Title} from '@mantine/core';

interface Props {
    foods: Food[];
    loading: boolean;
}

export function FoodList({foods, loading}: Props) {
    return (
        <>
            <Title>
                Foods
            </Title>
            {!loading
                ? foods.map((food) => {
                    const categoryEmoji = food.category.toLowerCase() === 'proteína' ? '🥩' : '🥖';
                    
                    return (
                        <div key={food.id}>
                            <div>{food.name} - {categoryEmoji}</div>
                        </div>);
                })
                : <Loading/>
            }
        </>
    );
}