'use client';

import Link from 'next/link';

import { getRecipeList } from '@/entities/recipe';
import { useQuery } from '@tanstack/react-query';

import { PlusCircle } from 'lucide-react';

import { CreateRecipe } from './create';

export function RecipeList() {
  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipeList,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
              <div className="h-6 w-3/4 bg-muted rounded mb-2" />
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-4 w-1/3 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="rounded-full bg-muted p-4 mb-4">
            <PlusCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold mb-2">저장된 레시피가 없습니다</h2>
          <p className="text-muted-foreground mb-4">새로운 레시피를 추가해보세요</p>

          <CreateRecipe />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="transition-transform hover:scale-105"
          >
            <div className="rounded-lg border bg-card p-4 hover:bg-muted/50">
              <h3 className="font-semibold text-lg mb-2">{recipe.recipe_name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>온도: {recipe.temperature}°C</p>
                <p>시간: {recipe.cooking_time}</p>
                {recipe.memo && <p>메모: {recipe.memo}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
