export type MealFoodResponseType = {
    id: string;
    amount: number;
    unit: string;
};

export type MealFoodType = {
    id: string;
    foodId: string;
    amount: number;
    unit: string;
};

export type FullFoodInfo = {
    id: string;
    foodId: string;
    name: string | null;
    category: string | null;
    amount: number;
    unit: string;
}

export type MealWithFullFoodInfo = {
    foods: FullFoodInfo[];
    id: string;
    name: string;
    type: string;
}

export type MenuMealType = {
    id: string;
    mealId: string;
    date: Date;
}