'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import type { CreateRecipeDTO } from '@/entities/recipe';
import { createRecipe, deleteRecipe, getRecipeById, getRecipeList } from '@/entities/recipe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEYS = {
  recipes: ['recipes'] as const,
  recipe: (id: string) => ['recipes', id] as const,
};

export function useRecipeList() {
  return useQuery({
    queryKey: QUERY_KEYS.recipes,
    queryFn: getRecipeList,
    staleTime: 5 * 1000,
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.recipe(id),
    queryFn: () => getRecipeById(id),
    staleTime: 5 * 1000,
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateRecipeDTO) => createRecipe(data),
    onSuccess: (recipe) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.recipes });
      window.alert('레시피가 저장되었습니다.');
      router.push(`/recipes/${recipe.id}`);
    },
    onError: (error: Error) => {
      window.alert(error.message || '레시피 저장 중 오류가 발생했습니다.');
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [, startTransition] = useTransition();

  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.recipes });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.recipe(id) });

      const previousRecipes = queryClient.getQueryData(QUERY_KEYS.recipes);

      queryClient.setQueryData(
        QUERY_KEYS.recipes,
        (old: any[]) => old?.filter((recipe) => recipe.id !== id) ?? []
      );

      queryClient.removeQueries({ queryKey: QUERY_KEYS.recipe(id) });

      return { previousRecipes };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.recipes });

      setTimeout(() => {
        startTransition(() => {
          router.push('/');
        });
      }, 0);
    },
    onError: (error, _, context) => {
      if (context?.previousRecipes) {
        queryClient.setQueryData(QUERY_KEYS.recipes, context.previousRecipes);
      }
      window.alert(error.message || '레시피 삭제 중 오류가 발생했습니다.');
    },
  });
}
