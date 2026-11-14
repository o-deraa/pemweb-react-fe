export const STORAGE_KEY = 'product-management-products-v1';

export const MAX_PRICE = 1_000_000_000;

function isValidProduct(entry) {
  return (
    entry !== null &&
    typeof entry === 'object' &&
    typeof entry.id === 'string' &&
    entry.id.length > 0 &&
    typeof entry.name === 'string' &&
    entry.name.trim().length > 0 &&
    Number.isInteger(entry.price) &&
    entry.price > 0 &&
    entry.price <= MAX_PRICE
  );
}

function parseStoredProducts(raw) {
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    return null;
  }

  const seenIds = new Set();
  const products = [];

  for (const entry of parsed) {
    if (!isValidProduct(entry) || seenIds.has(entry.id)) {
      return null;
    }

    seenIds.add(entry.id);
    products.push({ id: entry.id, name: entry.name, price: entry.price });
  }

  return products;
}

export function loadProducts(fallback) {
  let raw;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('localStorage tidak dapat dibaca, memakai data awal.', error);
    return fallback;
  }

  if (raw === null) {
    return fallback;
  }

  try {
    const products = parseStoredProducts(raw);

    if (products === null) {
      console.warn(
        'Data produk di localStorage rusak, memakai data awal.',
      );
      return fallback;
    }

    return products;
  } catch (error) {
    console.warn('Data produk di localStorage bukan JSON yang valid.', error);
    return fallback;
  }
}

export function saveProducts(products) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.warn('Perubahan produk tidak dapat disimpan.', error);
    return false;
  }
}
