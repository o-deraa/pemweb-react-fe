import { formatRupiah } from '../utils/currency.js';

export function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="card">
      <p className="card__id">ID: {product.id}</p>
      <h2 className="card__name">{product.name}</h2>
      <p className="card__price">{formatRupiah(product.price)}</p>
      <div className="card__actions">
        <button
          type="button"
          className="button button--edit"
          onClick={() => onEdit(product.id)}
          aria-label={`Edit ${product.name}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="button button--delete"
          onClick={() => onDelete(product.id)}
          aria-label={`Hapus ${product.name}`}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
