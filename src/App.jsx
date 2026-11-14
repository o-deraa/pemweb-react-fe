import { useRef, useState } from 'react';
import { ProductCard } from './components/ProductCard.jsx';
import { ProductFormModal } from './components/ProductFormModal.jsx';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.jsx';
import { useProducts } from './hooks/useProducts.js';

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct, persisted } =
    useProducts();
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null);
  const triggerRef = useRef(null);

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
      <main className="page" inert={activeDialog ? true : undefined}>
        <header className="page__header">
          <div>
            <h1 className="page__title">Manajemen Produk</h1>
            <p className="page__subtitle">
              Kelola daftar produk dan harga dalam satu tempat.
            </p>
          </div>
          <button
            type="button"
            className="button button--primary button--add"
            onClick={openAddDialog}
          >
            <span aria-hidden="true">+</span> Tambah Produk
          </button>
        </header>

        <section className="toolbar" aria-label="Pencarian produk">
          <div className="search">
            <svg
              className="search__icon"
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
              className="search__input"
              type="search"
              value={query}
              placeholder="Cari nama produk..."
              aria-label="Cari produk berdasarkan nama"
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <p className="toolbar__count">{products.length} produk</p>
        </section>

        {!persisted && (
          <p className="page__warning" role="status">
            Perubahan tidak dapat disimpan di peramban ini. Data akan hilang
            saat halaman dimuat ulang.
          </p>
        )}

        {products.length === 0 ? (
          <div className="empty">
            <h2 className="empty__title">Belum ada produk</h2>
            <p className="empty__text">
              Tambahkan produk pertama untuk memulai.
            </p>
            <button
              type="button"
              className="button button--primary"
              onClick={openAddDialog}
            >
              <span aria-hidden="true">+</span> Tambah Produk
            </button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="empty">
            <h2 className="empty__title">Produk tidak ditemukan</h2>
            <p className="empty__text">Coba kata kunci lain.</p>
          </div>
        ) : (
          <div className="grid">
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

        <p className="page__summary">
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
