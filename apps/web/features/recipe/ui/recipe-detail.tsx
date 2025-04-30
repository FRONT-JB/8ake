'use client';

import Link from 'next/link';

import { getRecipeById } from '@/entities/recipe';
import { Button } from '@repo/ui';
import { useQuery } from '@tanstack/react-query';

import { AlertCircle } from 'lucide-react';

import { DeleteButton } from './delete-button';
import { Temperature } from './temperature';

interface RecipeDetailProps {
  id: string;
}

export function RecipeDetail({ id }: RecipeDetailProps) {
  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipes', id],
    queryFn: () => getRecipeById(id),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="rounded-lg border bg-card">
          <div className="p-6 border-b">
            <div className="h-8 w-1/2 bg-muted rounded animate-pulse" />
          </div>
          <div className="p-6 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 w-1/4 bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold mb-2">레시피를 찾을 수 없습니다</h2>
          <p className="text-muted-foreground mb-4">
            요청하신 레시피가 존재하지 않거나 삭제되었을 수 있습니다
          </p>
          <Button asChild>
            <Link href="/">목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg border bg-card">
        <div className="p-6 flex items-center justify-between border-b">
          <h1 className="text-2xl font-bold">{recipe.recipe_name}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/">목록으로</Link>
            </Button>
            <DeleteButton recipeId={recipe.id} />
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">온도</h3>
            <Temperature value={recipe.temperature} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">조리 시간</h3>
            <p>{recipe.cooking_time}분</p>
          </div>
          {recipe.memo && (
            <div>
              <h3 className="font-semibold mb-2">메모</h3>
              <p className="whitespace-pre-wrap text-muted-foreground">{recipe.memo}</p>
            </div>
          )}
          <div>
            <h3 className="font-semibold mb-2">재료</h3>
            {recipe.recipe_ingredients.length > 0 ? (
              <div className="space-y-2">
                {recipe.recipe_ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <span>{ingredient.name}</span>
                    <span className="text-muted-foreground">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">등록된 재료가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
