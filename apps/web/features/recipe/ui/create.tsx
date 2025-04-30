'use client';

import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui';

import { CreateForm } from './create-form';

export function CreateRecipe() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">레시피 만들기</Button>
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>레시피 만들기</DialogTitle>
          <DialogDescription>
            새로운 레시피를 등록합니다. 모든 필수 항목을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <CreateForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
