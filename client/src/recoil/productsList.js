import { selector } from "recoil";
import {
  productsState,
  selectedFiltersState,
  currentPageState,
  productsPerPageState,
} from "./atom";

// WARN: code below is not used.
export const filteredProductsSelector = selector({
  key: "filteredProductsSelector",
  get: ({ get }) => {
    const products = get(productsState);
    // console.log(products);
    const filters = get(selectedFiltersState);
    // console.log(filters);
    return products.filter((product) => {
      return (
        (!filters.category.length ||
          filters.category.includes(product.ProductCategoryName)) &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (!filters.rating.length ||
          filters.rating.some(
            (rating) => Math.floor(product.ratingAvg) >= rating
          ))
      );
    });
  },
});

export const paginatedProductsState = selector({
  key: "paginatedProductsState",
  get: ({ get }) => {
    const filteredProducts = get(filteredProductsSelector);
    // console.log(filteredProducts);
    const currentPage = get(currentPageState);
    const productsPerPage = get(productsPerPageState);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  },
});
