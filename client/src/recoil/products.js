import { selector } from "recoil";
import axios from "axios";
import {
  productsState,
  selectedFiltersState,
  loadingState,
  currentPageState,
  productsPerPageState,
} from "./atom";

//WARN: fetchProducts
const url = "https://dummyjson.com/products?limit=100";

export const fetchProducts = selector({
  key: "fetchProducts",
  get: async ({ get }) => {
    get(loadingState); // Accessing loadingState to include it in the dependency graph
    try {
      const response = await axios.get(
        url
      );
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
});

export const filteredProductsSelector = selector({
  key: "filteredProductsSelector",
  get: ({ get }) => {
    const products = get(productsState);
    const filters = get(selectedFiltersState);

    return products.filter(product => {
      return (!filters.category.length || filters.category.includes(product.category)) &&
             (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
             (!filters.rating.length || filters.rating.some(rating => Math.floor(product.rating) >= rating));
    });
  },
});

export const paginatedProductsState = selector({
  key: "paginatedProductsState",
  get: ({ get }) => {
    const filteredProducts = get(filteredProductsSelector);
    const currentPage = get(currentPageState);
    const productsPerPage = get(productsPerPageState);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  },
});
