import { useRef, useState } from 'react';
import { Modal } from './Modal.jsx';
import { MAX_PRICE } from '../utils/storage.js';

const NAME_MAX_LENGTH = 100;
const fieldInputClass =
  'min-h-[46px] w-full rounded-none border-[3px] border-ink bg-[#fbf7ee] px-3 text-[15px] text-ink focus-visible:bg-surface focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue-strong aria-[invalid=true]:border-danger';
const formButtonClass =
  'inline-flex min-h-[46px] min-w-0 flex-1 cursor-pointer items-center justify-center rounded-none border-[3px] border-ink px-[10px] py-1.5 font-display text-[13.5px] font-bold leading-[1.2] text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong';

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
      <h2
        className="modal__title pr-14 font-display text-[22px] font-extrabold leading-[1.2]"
        id="product-form-title"
      >
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <p className="modal__desc mt-1.5 text-sm text-subtext" id="product-form-desc">
        {isEdit
          ? 'Perbarui informasi produk yang dipilih.'
          : 'Masukkan informasi produk baru.'}
      </p>
      {isEdit && (
        <p className="modal__meta mt-[14px] overflow-wrap-anywhere text-xs font-bold text-subtext">
          ID: {product.id}
        </p>
      )}

      <form className="form mt-5" onSubmit={handleSubmit} noValidate>
        <div className="field mb-4 last-of-type:mb-0">
          <label
            className="field__label mb-1.5 block text-[13.5px] font-bold"
            htmlFor="product-name"
          >
            Nama Produk
          </label>
          <input
            id="product-name"
            ref={nameRef}
            className={`field__input ${fieldInputClass}`}
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
            <p
              className="field__error mt-1.5 text-[13px] font-bold text-danger"
              id="product-name-error"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="field mb-4 last-of-type:mb-0">
          <label
            className="field__label mb-1.5 block text-[13.5px] font-bold"
            htmlFor="product-price"
          >
            Harga (Rp)
          </label>
          <input
            id="product-price"
            ref={priceRef}
            className={`field__input ${fieldInputClass}`}
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
          <p className="field__help mt-1.5 text-[12.5px] text-subtext" id="product-price-help">
            Harga harus lebih dari 0.
          </p>
          {errors.price && (
            <p
              className="field__error mt-1.5 text-[13px] font-bold text-danger"
              id="product-price-error"
              role="alert"
            >
              {errors.price}
            </p>
          )}
        </div>

        <div className="modal__footer mt-6 flex gap-[10px]">
          <button
            type="button"
            className={`${formButtonClass} button button--ghost bg-muted`}
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className={`${formButtonClass} button button--primary bg-yellow shadow-action hover:shadow-[2px_2px_0_#171717]`}
          >
            {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
