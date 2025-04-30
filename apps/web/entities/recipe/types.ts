interface Recipe {
  id: string;
  recipe_name: string;
  temperature: number;
  cooking_time: string;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

interface RecipeIngredient {
  id: string;
  recipe_id: string;
  name: string;
  amount: string;
  created_at: string;
}

interface CreateRecipeDTO {
  recipeName: string;
  temperature: number;
  cookingTime: string;
  memo?: string;
  ingredients: Array<{
    name: string;
    amount: string;
  }>;
}

export type { CreateRecipeDTO, Recipe, RecipeIngredient };
