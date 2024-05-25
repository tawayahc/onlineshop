import { atom, selector } from 'recoil';

export const productListState = atom({
  key: 'productListState',
  default: [],
});

export const selectedProductIdsState = atom({
  key: 'selectedProductIdsState',
  default: [],
});

export const productModalState = atom({
  key: 'productModalState',
  default: {
    isOpen: false,
    mode: 'add',
    product: null,
  },
});

export const productCategoriesState = atom({
  key: 'productCategoriesState',
  default: [],
});

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

export const selectedCategoryState = atom({
  key: 'selectedCategoryState',
  default: 'All',
});

export const sortByState = atom({
  key: 'sortByState',
  default: 'default',
});

export const selectedImageState = atom({
    key: 'selectedImageState',
    default: null,
});

export const filteredProductsState = selector({
  key: 'filteredProductsState',
  get: ({ get }) => {
    const products = get(productListState);
    const searchTerm = get(searchTermState).toLowerCase();
    const selectedCategory = get(selectedCategoryState);
    const sortBy = get(sortByState);

    return products
      .filter(product => {
        if (selectedCategory !== 'All' && product.ProductCategoryName !== selectedCategory) {
          return false;
        }
        return product.ProductName.toLowerCase().includes(searchTerm);
      })
      .sort((a, b) => {
        if (sortBy === 'ascending') {
          return a.Price - b.Price;
        } else if (sortBy === 'descending') {
          return b.Price - a.Price;
        }
        return 0;
      });
  },
});
