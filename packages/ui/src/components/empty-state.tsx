import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-background border-border hover:border-border/80 text-center',
        'rounded-xl p-14 w-full',
        'group hover:bg-muted/30 transition duration-500 hover:duration-200',
        'flex flex-col items-center justify-center gap-1',
        className
      )}
    >
      <h2 className="text-foreground font-medium">{title}</h2>

      <p className="text-sm text-muted-foreground whitespace-pre-line">{description}</p>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
