import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.js';
import { formatRupiah } from '../utils/currency.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((item) => item.id === id);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Manajemen Produk`;
    }
  }, [product]);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[1120px] pb-[72px] pt-10 max-[680px]:pb-14">
      <Link
        className="backlink inline-flex min-h-11 items-center gap-2 border-b-[3px] border-b-transparent px-0.5 font-display text-sm font-bold text-ink no-underline hover:border-b-ink focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
        to="/"
      >
        <span className="text-lg leading-none" aria-hidden="true">
          ←
        </span>
        Kembali ke daftar
      </Link>

      <article
        className="detail__panel mt-6 max-w-[760px] rounded-none border-[3px] border-ink bg-surface p-10 shadow-modal max-[680px]:p-6"
        aria-labelledby="detail-title"
      >
        <div className="detail__top flex items-baseline justify-between gap-4 border-b-[3px] border-ink pb-3 max-[420px]:items-start">
          <p className="detail__eyebrow font-display text-xs font-extrabold uppercase text-subtext">
            Detail Produk
          </p>
          <p className="detail__id [overflow-wrap:anywhere] text-[12.5px] font-bold text-subtext">
            ID: {product.id}
          </p>
        </div>
        <h1
          className="detail__title mt-3 [overflow-wrap:anywhere] font-display text-[clamp(32px,6vw,54px)] font-extrabold leading-[1.05]"
          id="detail-title"
        >
          {product.name}
        </h1>
        <p className="detail__price mt-4 inline-block rounded-none border-[3px] border-ink bg-blue px-4 py-[10px] font-display text-[clamp(22px,3vw,30px)] font-extrabold shadow-card">
          {formatRupiah(product.price)}
        </p>

        <p className="mt-6 max-w-[52ch] text-sm text-subtext">
          Halaman ini membaca data yang sama dengan daftar produk. Semua
          perubahan tersimpan di localStorage peramban ini dan hilang kalau data
          situs dibersihkan.
        </p>
      </article>
    </main>
  );
}
