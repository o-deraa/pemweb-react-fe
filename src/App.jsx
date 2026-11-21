import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './components/ProductCard.jsx';
import { ProductFormModal } from './components/ProductFormModal.jsx';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.jsx';
import { useProducts } from './hooks/useProducts.js';

const buttonClass =
  'inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-none border-[3px] border-ink bg-surface px-[18px] font-display text-sm font-bold text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong';
const primaryButtonClass = `${buttonClass} bg-yellow shadow-action hover:shadow-[2px_2px_0_#171717]`;

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct, persisted } =
    useProducts();
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    document.title = 'Manajemen Produk';
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase('id-ID');
  const visibleProducts = normalizedQuery
    ? products.filter((product) =>
        product.name.toLocaleLowerCase('id-ID').includes(normalizedQuery),
      )
    : products;

  const selectedProduct = dialog?.productId
    ? (products.find((product) => product.id === dialog.productId) ?? null)
    : null;
  const activeDialog =
    dialog?.type === 'add' || selectedProduct !== null ? dialog : null;

  const closeDialog = () => setDialog(null);
  const openDialog = (next) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setDialog(next);
  };
  const openAddDialog = () => openDialog({ type: 'add' });

  return (
    <>
      <main
        className="page mx-auto w-[calc(100%-32px)] max-w-[1120px] py-14 pb-[72px] max-[680px]:py-10 max-[680px]:pb-14"
        inert={activeDialog ? true : undefined}
      >
        <header className="flex items-start justify-between gap-6 max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:gap-[18px]">
          <div>
            <h1 className="font-display text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.1]">
              Manajemen Produk
            </h1>
            <p className="page__subtitle mt-1.5 text-[15px] text-subtext">
              Kelola daftar produk dan harga dalam satu tempat.
            </p>
          </div>
          <button
            type="button"
            className={`button--add ${primaryButtonClass} min-h-12 whitespace-nowrap px-[22px] text-[15px] max-[680px]:w-full`}
            onClick={openAddDialog}
          >
            <span aria-hidden="true">+</span> Tambah Produk
          </button>
        </header>

        <section
          className="mt-7 flex items-center gap-4 max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:gap-3"
          aria-label="Pencarian produk"
        >
          <div className="search relative w-[340px] max-w-full flex-[0_1_340px] max-[680px]:w-full max-[680px]:flex-auto">
            <svg
              className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-subtext"
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
            <input
              className="search__input min-h-12 w-full rounded-none border-[3px] border-ink bg-surface py-0 pl-[42px] pr-[14px] text-[15px] text-ink shadow-[3px_3px_0_#171717] placeholder:text-[#6b6459] placeholder:opacity-100 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
              type="search"
              value={query}
              placeholder="Cari nama produk..."
              aria-label="Cari produk berdasarkan nama"
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <p className="toolbar__count ml-auto whitespace-nowrap font-display text-sm font-bold text-subtext max-[680px]:ml-0">
            {products.length} produk
          </p>
        </section>

        {!persisted && (
          <p
            className="page__warning mt-5 rounded-none border-[3px] border-ink bg-[#fff0f1] px-[14px] py-3 text-[13.5px] font-semibold"
            role="status"
          >
            Perubahan tidak dapat disimpan di peramban ini. Data akan hilang
            saat halaman dimuat ulang.
          </p>
        )}

        {products.length === 0 ? (
          <div className="empty mt-5 rounded-none border-[3px] border-ink bg-surface px-6 py-11 text-center shadow-card">
            <h2 className="empty__title font-display text-xl font-extrabold">
              Belum ada produk
            </h2>
            <p className="empty__text mt-2 text-[15px] text-subtext">
              Tambahkan produk pertama untuk memulai.
            </p>
            <button
              type="button"
              className={`${primaryButtonClass} mt-5`}
              onClick={openAddDialog}
            >
              <span aria-hidden="true">+</span> Tambah Produk
            </button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="empty mt-5 rounded-none border-[3px] border-ink bg-surface px-6 py-11 text-center shadow-card">
            <h2 className="empty__title font-display text-xl font-extrabold">
              Produk tidak ditemukan
            </h2>
            <p className="empty__text mt-2 text-[15px] text-subtext">Coba kata kunci lain.</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(id) => openDialog({ type: 'edit', productId: id })}
                onDelete={(id) => openDialog({ type: 'delete', productId: id })}
              />
            ))}
          </div>
        )}

        <p className="page__summary mt-6 text-sm font-semibold text-subtext">
          Menampilkan {visibleProducts.length} dari {products.length} produk
        </p>
      </main>

      {activeDialog?.type === 'add' && (
        <ProductFormModal
          mode="add"
          returnFocusTo={triggerRef.current}
          onSubmit={(values) => {
            addProduct(values);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}

      {activeDialog?.type === 'edit' && selectedProduct && (
        <ProductFormModal
          key={selectedProduct.id}
          mode="edit"
          product={selectedProduct}
          returnFocusTo={triggerRef.current}
          onSubmit={(values) => {
            updateProduct(selectedProduct.id, values);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}

      {activeDialog?.type === 'delete' && selectedProduct && (
        <DeleteConfirmModal
          key={selectedProduct.id}
          product={selectedProduct}
          returnFocusTo={triggerRef.current}
          onConfirm={() => {
            deleteProduct(selectedProduct.id);
            closeDialog();
          }}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
