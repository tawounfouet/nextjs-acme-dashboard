import { Supplier } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import {
  BuildingOffice2Icon,
  GlobeEuropeAfricaIcon,
  SignalIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import RefreshSuppliers from './refresh-button';

function vendorCode(supplier: Supplier) {
  return (
    supplier.external_identifiers.find(
      (identifier) => identifier.kind === 'LOCAL_VENDOR_CODE',
    )?.value ?? 'Unassigned'
  );
}

function monogram(supplier: Supplier) {
  return (supplier.trading_name ?? supplier.legal_name)
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function SuppliersTable({
  suppliers,
  total,
  filtered,
  totalPages,
}: {
  suppliers: Supplier[];
  total: number;
  filtered: boolean;
  totalPages: number;
}) {
  const countries = new Set(
    suppliers.map((supplier) => supplier.country_code).filter(Boolean),
  ).size;
  const supplierTypes = new Set(
    suppliers.map((supplier) => supplier.supplier_type).filter(Boolean),
  ).size;

  return (
    <div className="w-full">
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-6 py-7 text-white shadow-lg md:px-8">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-cyan-400/20" />
        <div className="absolute -right-5 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <SignalIcon className="h-3.5 w-3.5" />
              Live from PySRMKit
            </div>
            <h1 className={`${lusitana.className} text-3xl md:text-4xl`}>
              Supplier network
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              A canonical view of your supply base, served by the Python domain
              engine.
            </p>
          </div>
          <RefreshSuppliers />
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: filtered ? 'Matching suppliers' : 'Suppliers',
            value: total,
            icon: BuildingOffice2Icon,
          },
          {
            label: 'Countries shown',
            value: countries,
            icon: GlobeEuropeAfricaIcon,
          },
          {
            label: 'Supplier types',
            value: supplierTypes,
            icon: Squares2X2Icon,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="rounded-lg bg-cyan-50 p-2.5 text-cyan-700">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <p className="mt-0.5 text-2xl font-semibold text-slate-950">
                {value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-6">
        <Search placeholder="Search suppliers, country or vendor code..." />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="md:hidden">
          {suppliers.map((supplier) => (
            <article
              key={supplier.supplier_id}
              className="border-b border-slate-200 bg-white p-5 last:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold tracking-wide text-cyan-300">
                  {monogram(supplier)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-950">
                    {supplier.legal_name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {vendorCode(supplier)}
                  </p>
                </div>
                <span className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-800">
                  {supplier.country_code ?? '--'}
                </span>
              </div>
              <div className="mt-4 flex min-w-0 items-center justify-between gap-3 text-sm text-slate-600">
                <span className="truncate">
                  {supplier.trading_name ?? 'No trading name'}
                </span>
                <span className="max-w-[45%] truncate rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                  {supplier.supplier_type ?? 'UNCLASSIFIED'}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[680px] text-left md:min-w-full">
            <thead className="border-b border-slate-200 bg-slate-100/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Supplier</th>
                <th className="px-4 py-4 font-semibold">Vendor code</th>
                <th className="px-4 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 text-right font-semibold">Country</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.supplier_id}
                  className="transition hover:bg-cyan-50/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold tracking-wide text-cyan-300">
                        {monogram(supplier)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-950">
                          {supplier.legal_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {supplier.trading_name ?? 'No trading name'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-600">
                    {vendorCode(supplier)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {supplier.supplier_type ?? 'UNCLASSIFIED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    {supplier.country_code ?? '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {suppliers.length === 0 && (
          <div className="bg-white px-6 py-14 text-center">
            <p className="font-medium text-slate-900">No suppliers found</p>
            <p className="mt-1 text-sm text-slate-500">
              {filtered
                ? 'Try a broader search.'
                : 'Register a supplier in PySRMKit.'}
            </p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
