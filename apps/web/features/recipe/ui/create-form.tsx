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

import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Temperature } from './temperature';

export function CreateForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="레시피 이름"
        render={({ field }) => (
          <FormItem>
            <FormLabel>레시피 이름</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex items-start gap-2">
        <FormField
          control={form.control}
          name="재료"
          render={({ field }) => (
            <FormItem className="flex-[0.75]">
              <FormLabel>재료</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="용량"
          render={({ field }) => (
            <FormItem className="flex-[0.25]">
              <FormLabel>용량</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Button variant="outline" className="flex items-center gap-0.5">
        <Plus size={16} strokeWidth={2} aria-hidden="true" />
        재료 추가
      </Button>

      <Separator className="my-2" />

      <FormField
        control={form.control}
        name="오븐온도"
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
        name="굽는 시간"
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
        name="메모"
        render={({ field }) => (
          <FormItem>
            <FormLabel>메모</FormLabel>

            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button className="mt-4" type="submit">
        레시피 저장
      </Button>
    </Form>
  );
}
