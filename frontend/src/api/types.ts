export type ResponseMetadata = {
    success: boolean
    error?: string | null
    totalCount?: number
}

export type MyBentoResponse<T> = {
    data: T | T[] | null
    metadata: ResponseMetadata
}

export type Food = {
    id: string
    name: string
    category: string
}

export type CreateFoodRequest = {
    id: string
    name: string
    category: string
}

export type UpdateFoodRequest = {
    name: string
    category: string
}

export type MealFood = {
  id: string
  foodId: string
  amount: number
  unit: string
}

export type FullFoodInfo = {
  id: string
  foodId: string
  name: string | null
  category: string | null
  amount: number
  unit: string
}

export type Meal = {
  id: string
  name: string
  type: string
  foods: MealFood[]
}

export type MealDto = {
  id: string
  name: string
  type: string
  foods: FullFoodInfo[]
}

export type CreateMealRequest = {
    id: string
    name: string
    type: string
    foods: MealFood[]
}

export type UpdateMealRequest = {
    id: string
    name: string
    type: string
    foods: MealFood[]
}

export type MenuMeal = {
  id: string
  mealId: string
  date: string
}

export type FullMenuMealInfo = {
  id: string
  name: string | null
  type: string | null
  date: string
}

export type Menu = {
  id: string
  meals: MenuMeal[]
}

export type MenuDto = {
  id: string
  meals: FullMenuMealInfo[]
}

export type Paginated<T> = {
  data: T[]
  totalCount: number
}

export type CreateMenuRequest = {
    id: string
    meals: MenuMeal[]
}

export type UpdateMenuRequest = {
    meals: MenuMeal[]
}
