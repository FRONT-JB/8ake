import { getRecipeList } from '@/entities/recipe';
import { RecipeWidget } from '@/widgets/recipe-widget';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipes'],
    queryFn: getRecipeList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeWidget />
    </HydrationBoundary>
  );
}
