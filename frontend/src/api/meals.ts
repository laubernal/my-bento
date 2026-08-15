import {request} from './apiClient';
import type {CreateMealRequest, MealDto, Paginated, UpdateMealRequest} from './types';

export function getMeals(): Promise<Paginated<MealDto>> {
    return request<Paginated<MealDto>>('/api/meals');
}

export function getMeal(id: string): Promise<MealDto> {
    return request<MealDto>(`/api/meals/${id}`);
}

export function createMeal(input: CreateMealRequest): Promise<null> {
    return request<null>('/api/meals', {method: 'POST', body: input});
}

export function updateMeal(id: string, input: UpdateMealRequest): Promise<null> {
    return request<null>(`/api/meals/${id}`, {method: 'PUT', body: input});
}

export function deleteMeal(id: string): Promise<null> {
    return request<null>(`/api/meals/${id}`, {method: 'DELETE'});
}
