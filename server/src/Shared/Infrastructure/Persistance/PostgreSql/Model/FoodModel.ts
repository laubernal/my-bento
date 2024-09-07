export interface FoodModel {
  id: string;
  name: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  [key: string]: string | Date;
}
