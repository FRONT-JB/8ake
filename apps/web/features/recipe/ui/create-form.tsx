'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Separator,
  Textarea,
} from '@repo/ui';

import { Plus, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateRecipe } from '../hooks/use-recipe';

import { Temperature } from './temperature';

const recipeFormSchema = z.object({
  recipeName: z.string().min(1, '레시피 이름을 입력해주세요'),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, '재료를 입력해주세요'),
      amount: z.string().min(1, '용량을 입력해주세요'),
    })
  ),
  temperature: z.number().min(0).max(400),
  cookingTime: z.string().min(1, '굽는 시간을 입력해주세요'),
  memo: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface CreateFormProps {
  onSuccess?: () => void;
}

export function CreateForm({ onSuccess }: CreateFormProps) {
  const { mutate: createRecipe, isPending } = useCreateRecipe();

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      recipeName: '',
      ingredients: [{ name: '', amount: '' }],
      temperature: 180,
      cookingTime: '',
      memo: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  function onSubmit(data: RecipeFormValues) {
    createRecipe(data, {
      onSuccess: () => {
        onSuccess?.();
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>레시피 이름</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-[0.75]">
                  <FormLabel>재료 {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ingredients.${index}.amount`}
              render={({ field }) => (
                <FormItem className="flex-[0.25]">
                  <FormLabel className="w-auto">용량</FormLabel>

                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-0.5"
          onClick={() => append({ name: '', amount: '' })}
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
          재료 추가
        </Button>

        <Separator className="my-2" />

        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Temperature {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>굽는 시간</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Separator className="my-2" />

        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full" type="submit" disabled={isPending}>
          {isPending ? '저장 중...' : '레시피 저장'}
        </Button>
      </form>
    </Form>
  );
}
