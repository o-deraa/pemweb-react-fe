import { useCallback, useEffect, useState } from 'react';
import { initialProducts } from '../data/initialProducts.js';
import { loadProducts, saveProducts } from '../utils/storage.js';

function createProductId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `product-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useProducts() {
  const [products, setProducts] = useState(() => loadProducts(initialProducts));
  const [persisted, setPersisted] = useState(true);

  useEffect(() => {
    setPersisted(saveProducts(products));
  }, [products]);

  const addProduct = useCallback(({ name, price }) => {
    const product = { id: createProductId(), name, price };
    setProducts((current) => [...current, product]);
    return product;
  }, []);

  const updateProduct = useCallback((id, { name, price }) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, name, price } : product,
      ),
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct, persisted };
}
