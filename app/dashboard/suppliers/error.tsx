'use client';

import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
        <ExclamationTriangleIcon className="mx-auto h-10 w-10 text-amber-600" />
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Supplier service unavailable
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The supplier directory could not be reached. Check the service and try
          again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Retry
        </button>
      </div>
    </main>
  );
}
