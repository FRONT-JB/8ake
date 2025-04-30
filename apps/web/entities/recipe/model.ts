import { createClient } from '@/lib/supabase/client';
import { createServer } from '@/lib/supabase/server';

import type { CreateRecipeDTO } from './types';

export async function createRecipe(recipe: CreateRecipeDTO) {
  const supabase = createClient();

  const { data: recipeData, error: recipeError } = await supabase
    .from('recipes')
    .insert({
      recipe_name: recipe.recipeName,
      temperature: recipe.temperature,
      cooking_time: recipe.cookingTime,
      memo: recipe.memo || null,
    })
    .select()
    .single();

  if (recipeError) {
    throw new Error('레시피 저장 중 오류가 발생했습니다.');
  }

  const { error: ingredientsError } = await supabase.from('recipe_ingredients').insert(
    recipe.ingredients.map((ingredient) => ({
      recipe_id: recipeData.id,
      name: ingredient.name,
      amount: ingredient.amount,
    }))
  );

  if (ingredientsError) {
    throw new Error('레시피 재료 저장 중 오류가 발생했습니다.');
  }

  return recipeData;
}

export async function getRecipeList() {
  const supabase = await createServer();

  const { data: recipes, error: recipesError } = await supabase
    .from('recipes')
    .select('id, recipe_name, temperature, cooking_time, memo, created_at, updated_at');

  if (recipesError) {
    throw new Error('레시피 목록을 가져오는 중 오류가 발생했습니다.');
  }

  // Return plain objects without any class instances or complex types
  return (
    recipes?.map((recipe) => ({
      id: recipe.id,
      recipe_name: recipe.recipe_name,
      temperature: recipe.temperature,
      cooking_time: recipe.cooking_time,
      memo: recipe.memo,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
    })) ?? []
  );
}

export async function getRecipeById(id: string) {
  const supabase = await createServer();

  // First, get the recipe data
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('id, recipe_name, temperature, cooking_time, memo, created_at, updated_at')
    .eq('id', id)
    .single();

  if (recipeError) {
    throw new Error('레시피를 찾을 수 없습니다.');
  }

  // Then, get the ingredients separately
  const { data: ingredients, error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .select('id, name, amount, created_at')
    .eq('recipe_id', id);

  if (ingredientsError) {
    throw new Error('레시피 재료를 불러오는데 실패했습니다.');
  }

  // Return a plain object with explicitly defined properties
  return {
    id: recipe.id,
    recipe_name: recipe.recipe_name,
    temperature: recipe.temperature,
    cooking_time: recipe.cooking_time,
    memo: recipe.memo,
    created_at: recipe.created_at,
    updated_at: recipe.updated_at,
    recipe_ingredients:
      ingredients?.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        created_at: ingredient.created_at,
      })) ?? [],
  };
}

export async function deleteRecipe(id: string) {
  const supabase = createClient();

  const { error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .delete()
    .eq('recipe_id', id);

  if (ingredientsError) {
    throw new Error('레시피 재료 삭제 중 오류가 발생했습니다.');
  }

  // Then delete the recipe
  const { error: recipeError } = await supabase.from('recipes').delete().eq('id', id);

  if (recipeError) {
    throw new Error('레시피 삭제 중 오류가 발생했습니다.');
  }
}
