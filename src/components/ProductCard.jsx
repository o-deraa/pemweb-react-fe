import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/currency.js';

const actionButtonClass =
  'inline-flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-none border-[3px] border-ink px-2 font-display text-[13.5px] font-bold text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong';

export function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="card flex min-h-48 flex-col rounded-none border-[3px] border-ink bg-surface p-[18px] shadow-card">
      <p className="card__id overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px] font-bold text-subtext">
        ID: {product.id}
      </p>
      <h2 className="card__name mt-1.5 [overflow-wrap:anywhere] font-display text-[19px] font-extrabold leading-[1.25]">
        <Link
          className="text-inherit no-underline hover:underline hover:decoration-[3px] hover:underline-offset-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      </h2>
      <p className="card__price mt-1.5 font-display text-[19px] font-extrabold text-blue-strong">
        {formatRupiah(product.price)}
      </p>
      <div className="mt-auto flex gap-2 pt-5">
        <button
          type="button"
          className={`${actionButtonClass} button button--edit bg-blue`}
          onClick={() => onEdit(product.id)}
          aria-label={`Edit ${product.name}`}
        >
          Edit
        </button>
        <button
          type="button"
          className={`${actionButtonClass} button button--delete bg-pink`}
          onClick={() => onDelete(product.id)}
          aria-label={`Hapus ${product.name}`}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
