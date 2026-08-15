import {request} from './apiClient';
import type {CreateFoodRequest, Food, UpdateFoodRequest} from './types';

export function getFoods(): Promise<Food[]> {
    return request<Food[]>('/api/foods');
}

export function getFood(id: string): Promise<Food> {
    return request<Food>(`/api/foods/${id}`);
}

export function getFoodsByIds(ids: string[]): Promise<Food[]> {
    return request<Food[]>(`/api/foods-by-ids?ids=${encodeURIComponent(ids.join(','))}`);
}

export function createFood(input: CreateFoodRequest): Promise<null> {
    return request<null>('/api/foods', {method: 'POST', body: input});
}

export function updateFood(id: string, input: UpdateFoodRequest): Promise<null> {
    return request<null>(`/api/foods/${id}`, {method: 'PUT', body: input});
}

export function deleteFood(id: string): Promise<null> {
    return request<null>(`/api/foods/${id}`, {method: 'DELETE'});
}
