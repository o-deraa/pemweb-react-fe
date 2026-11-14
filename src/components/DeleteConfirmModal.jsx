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
      <div className="modal__center">
        <span className="modal__badge" aria-hidden="true">
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
        <h2 className="modal__title" id="delete-title">
          Hapus Produk?
        </h2>
        <p className="modal__desc" id="delete-desc">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>
      </div>

      <div className="delete-summary">
        <p className="delete-summary__id">ID: {product.id}</p>
        <p className="delete-summary__name">{product.name}</p>
        <p className="delete-summary__price">{formatRupiah(product.price)}</p>
      </div>

      <div className="modal__footer">
        <button
          type="button"
          className="button button--ghost"
          ref={cancelRef}
          onClick={onClose}
        >
          Batal
        </button>
        <button type="button" className="button button--danger" onClick={onConfirm}>
          Hapus Produk
        </button>
      </div>
    </Modal>
  );
}
