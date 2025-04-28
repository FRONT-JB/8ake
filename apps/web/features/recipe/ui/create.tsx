import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@repo/ui';

import { CreateForm } from './create-form';

export function CreateRecipe() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">레시피 만들기</Button>
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle>레시피 만들기</DialogTitle>

        <CreateForm />
      </DialogContent>
    </Dialog>
  );
}
