import { useRef, useState } from 'react';
import { Modal } from './Modal.jsx';
import { MAX_PRICE } from '../utils/storage.js';

const NAME_MAX_LENGTH = 100;

function validate(name, price) {
  const errors = {};
  const trimmedName = name.trim();

  if (!trimmedName) {
    errors.name = 'Nama produk wajib diisi.';
  } else if (trimmedName.length > NAME_MAX_LENGTH) {
    errors.name = 'Nama produk maksimal 100 karakter.';
  }

  if (!price.trim()) {
    errors.price = 'Harga produk wajib diisi.';
  } else {
    const parsedPrice = Number(price);

    if (
      !Number.isFinite(parsedPrice) ||
      !Number.isInteger(parsedPrice) ||
      parsedPrice <= 0
    ) {
      errors.price = 'Harga harus berupa bilangan bulat lebih dari 0.';
    } else if (parsedPrice > MAX_PRICE) {
      errors.price = 'Harga maksimal Rp1.000.000.000.';
    }
  }

  return errors;
}

export function ProductFormModal({
  mode,
  product,
  onSubmit,
  onClose,
  returnFocusTo,
}) {
  const isEdit = mode === 'edit';
  const [name, setName] = useState(isEdit ? product.name : '');
  const [price, setPrice] = useState(isEdit ? String(product.price) : '');
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const submittedRef = useRef(false);

  function clearError(field) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (submittedRef.current) {
      return;
    }

    const nextErrors = validate(name, price);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) {
        nameRef.current?.focus();
      } else {
        priceRef.current?.focus();
      }
      return;
    }

    submittedRef.current = true;
    onSubmit({ name: name.trim(), price: Number(price) });
  }

  return (
    <Modal
      titleId="product-form-title"
      descriptionId="product-form-desc"
      onClose={onClose}
      initialFocusRef={nameRef}
      returnFocusTo={returnFocusTo}
    >
      <h2 className="modal__title" id="product-form-title">
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <p className="modal__desc" id="product-form-desc">
        {isEdit
          ? 'Perbarui informasi produk yang dipilih.'
          : 'Masukkan informasi produk baru.'}
      </p>
      {isEdit && <p className="modal__meta">ID: {product.id}</p>}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field__label" htmlFor="product-name">
            Nama Produk
          </label>
          <input
            id="product-name"
            ref={nameRef}
            className="field__input"
            type="text"
            value={name}
            placeholder="Contoh: Pulpen"
            autoComplete="off"
            spellCheck={false}
            maxLength={140}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'product-name-error' : undefined}
            onChange={(event) => {
              setName(event.target.value);
              clearError('name');
            }}
          />
          {errors.name && (
            <p className="field__error" id="product-name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="product-price">
            Harga (Rp)
          </label>
          <input
            id="product-price"
            ref={priceRef}
            className="field__input"
            type="text"
            inputMode="numeric"
            value={price}
            placeholder="Contoh: 5000"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={errors.price ? 'true' : undefined}
            aria-describedby={
              errors.price
                ? 'product-price-help product-price-error'
                : 'product-price-help'
            }
            onChange={(event) => {
              setPrice(event.target.value);
              clearError('price');
            }}
          />
          <p className="field__help" id="product-price-help">
            Harga harus lebih dari 0.
          </p>
          {errors.price && (
            <p className="field__error" id="product-price-error" role="alert">
              {errors.price}
            </p>
          )}
        </div>

        <div className="modal__footer">
          <button type="button" className="button button--ghost" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="button button--primary">
            {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
