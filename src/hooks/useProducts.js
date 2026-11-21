import { useCallback, useEffect, useState } from 'react';
import { initialProducts } from '../data/initialProducts.js';
import { loadProducts, saveProducts } from '../utils/storage.js';

function nextProductId(products) {
  const highest = products.reduce((max, product) => {
    const value = Number(product.id);
    return Number.isInteger(value) && value > max ? value : max;
  }, 0);

  return String(highest + 1);
}

export function useProducts() {
  const [products, setProducts] = useState(() => loadProducts(initialProducts));
  const [persisted, setPersisted] = useState(true);

  useEffect(() => {
    setPersisted(saveProducts(products));
  }, [products]);

  const addProduct = useCallback(({ name, price }) => {
    setProducts((current) => [
      ...current,
      { id: nextProductId(current), name, price },
    ]);
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
