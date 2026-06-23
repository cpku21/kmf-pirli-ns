import React from 'react';
import { cn } from '@/utils/cn.tsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function LoadingSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded bg-[#1F2937]/80", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#1F2937] p-4 rounded-xl border border-slate-700/60 space-y-3">
      <LoadingSkeleton className="h-6 w-1/3 rounded-lg" />
      <LoadingSkeleton className="h-20 w-full rounded-lg" />
      <div className="flex gap-2">
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-slate-700/50">
      <LoadingSkeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-1/3 rounded" />
        <LoadingSkeleton className="h-3 w-1/4 rounded" />
      </div>
      <LoadingSkeleton className="h-6 w-12 rounded" />
    </div>
  );
}
