import { fetchSuppliers } from '@/app/lib/data';
import SuppliersTable from '@/app/ui/suppliers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppliers',
};

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query?.trim() ?? '';
  const currentPage = Math.max(Number(searchParams?.page) || 1, 1);
  const pageSize = 25;
  const supplierPage = await fetchSuppliers(
    (currentPage - 1) * pageSize,
    pageSize,
    query,
  );

  return (
    <main>
      <SuppliersTable
        suppliers={supplierPage.items}
        total={supplierPage.total}
        filtered={Boolean(query)}
        totalPages={Math.ceil(supplierPage.total / pageSize)}
      />
    </main>
  );
}
