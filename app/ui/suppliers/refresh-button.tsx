'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function RefreshSuppliers() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
    >
      <ArrowPathIcon className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
      {isPending ? 'Refreshing...' : 'Reload suppliers'}
    </button>
  );
}
