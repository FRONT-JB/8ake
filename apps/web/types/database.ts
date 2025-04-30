export type Recipe = {
  id: string;
  recipe_name: string;
  temperature: number;
  cooking_time: string;
  memo: string | null;
  created_at: string;
  updated_at: string;
};

export type RecipeIngredient = {
  id: string;
  recipe_id: string;
  name: string;
  amount: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      recipes: {
        Row: Recipe;
        Insert: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Recipe, 'id' | 'created_at' | 'updated_at'>>;
      };
      recipe_ingredients: {
        Row: RecipeIngredient;
        Insert: Omit<RecipeIngredient, 'id' | 'created_at'>;
        Update: Partial<Omit<RecipeIngredient, 'id' | 'created_at'>>;
      };
    };
  };
};
