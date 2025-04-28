'use client';

import { CreateRecipe } from '@/features/recipe';
import { EmptyState } from '@repo/ui/components/empty-state';

import { SearchIcon } from 'lucide-react';

export function Recipe() {
  return (
    <EmptyState
      className="h-full flex flex-col justify-center items-center"
      title="앗! 레시피가 없어요"
      description="원하는 재료로 레시피를 추가해보세요!"
      icon={<SearchIcon className="w-6 h-6 text-muted-foreground" />}
      action={<CreateRecipe />}
    />
  );
}
