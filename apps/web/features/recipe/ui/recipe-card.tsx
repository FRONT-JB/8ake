'use client';

import Link from 'next/link';

import type { Recipe } from '@/entities/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{recipe.recipe_name}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>온도: {recipe.temperature}°C</p>
            <p>시간: {recipe.cooking_time}</p>
            {recipe.memo && <p>메모: {recipe.memo}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}
