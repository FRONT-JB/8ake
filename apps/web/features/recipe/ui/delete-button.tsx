'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@repo/ui';

import { useDeleteRecipe } from '../hooks/use-recipe';

interface DeleteButtonProps {
  recipeId: string;
}

export function DeleteButton({ recipeId }: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const deleteMutation = useDeleteRecipe();

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(recipeId);
      startTransition(() => {
        router.push('/');
        router.refresh();
      });
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending || deleteMutation.isPending}
    >
      {isPending || deleteMutation.isPending ? '삭제 중...' : '삭제'}
    </Button>
  );
}
