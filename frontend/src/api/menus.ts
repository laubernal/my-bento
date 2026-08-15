import {request} from './apiClient';
import type {CreateMenuRequest, MenuDto, Paginated, UpdateMenuRequest} from './types';

export function getMenus(): Promise<Paginated<MenuDto>> {
    return request<Paginated<MenuDto>>('/api/menus');
}

export function getMenu(id: string): Promise<Paginated<MenuDto>> {
    return request<Paginated<MenuDto>>(`/api/menus/${id}`);
}

export function createMenu(input: CreateMenuRequest): Promise<null> {
    return request<null>('/api/menus', {method: 'POST', body: input});
}

export function updateMenu(id: string, input: UpdateMenuRequest): Promise<null> {
    return request<null>(`/api/menus/${id}`, {method: 'PUT', body: input});
}

export function deleteMenu(id: string): Promise<null> {
    return request<null>(`/api/menus/${id}`, {method: 'DELETE'});
}
