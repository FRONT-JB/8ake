import { getRecipeById } from '@/entities/recipe';
import { RecipeDetail } from '@/features/recipe/ui/recipe-detail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipes', id],
    queryFn: () => getRecipeById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeDetail id={id} />
    </HydrationBoundary>
  );
}
