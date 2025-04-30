import { getRecipeById } from '@/entities/recipe';
import { RecipeDetail } from '@/features/recipe/ui/recipe-detail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipes', params.id],
    queryFn: () => getRecipeById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeDetail id={params.id} />
    </HydrationBoundary>
  );
}
