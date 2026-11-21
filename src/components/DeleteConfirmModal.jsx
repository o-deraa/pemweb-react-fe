import { useRef } from 'react';
import { Modal } from './Modal.jsx';
import { formatRupiah } from '../utils/currency.js';

export function DeleteConfirmModal({ product, onConfirm, onClose, returnFocusTo }) {
  const cancelRef = useRef(null);

  return (
    <Modal
      titleId="delete-title"
      descriptionId="delete-desc"
      onClose={onClose}
      initialFocusRef={cancelRef}
      returnFocusTo={returnFocusTo}
    >
      <div className="modal__center text-center">
        <span className="modal__badge inline-flex size-14 items-center justify-center rounded-none border-[3px] border-ink bg-pink shadow-[3px_3px_0_#171717]" aria-hidden="true">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h16" />
            <path d="M9 7V5h6v2" />
            <path d="M6 7l1 13h10l1-13" />
            <path d="M10 11v5M14 11v5" />
          </svg>
        </span>
        <h2
          className="modal__title mt-3 pr-0 font-display text-[22px] font-extrabold leading-[1.2]"
          id="delete-title"
        >
          Hapus Produk?
        </h2>
        <p className="modal__desc mt-2 text-sm text-subtext" id="delete-desc">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>
      </div>

      <div className="delete-summary mt-[18px] rounded-none border-[3px] border-ink bg-muted px-4 py-[14px]">
        <p className="delete-summary__id overflow-wrap-anywhere text-[11.5px] font-bold text-subtext">
          ID: {product.id}
        </p>
        <p className="delete-summary__name mt-1 font-display text-[17px] font-extrabold overflow-wrap-anywhere">
          {product.name}
        </p>
        <p className="delete-summary__price mt-1 font-display text-base font-extrabold text-blue-strong">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="modal__footer mt-6 flex gap-[10px]">
        <button
          type="button"
          className="button button--ghost inline-flex min-h-[46px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-none border-[3px] border-ink bg-muted px-[10px] py-1.5 font-display text-[13.5px] font-bold leading-[1.2] text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
          ref={cancelRef}
          onClick={onClose}
        >
          Batal
        </button>
        <button
          type="button"
          className="button button--danger inline-flex min-h-[46px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-none border-[3px] border-ink bg-pink px-[10px] py-1.5 font-display text-[13.5px] font-bold leading-[1.2] text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
          onClick={onConfirm}
        >
          Hapus Produk
        </button>
      </div>
    </Modal>
  );
}
