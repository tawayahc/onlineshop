import { atom } from "recoil";

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const productsState = atom({
  key: "productsState",
  default: [],
});

export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const productsPerPageState = atom({
  key: "productsPerPageState",
  default: 20,
});

export const selectedFiltersState = atom({
  key: "selectedFiltersState",
  default: {
    category: [],
    priceRange: [0, 100000],
    rating: [],
  },
});

export const currentProductDetailState = atom({
  key: "currentProductDetail",
  default: {
    id: null,
    name: "Default Product Name",
    description: "Default Product Description",
    price: 0,
    quantityAvailable: 0,
    ratingAvg: 0,
    category: "Default Category",
    shop: {
      ShopName: "Default Shop Name",
      ShopDescription: "Default Shop Description",
      RatingAvg: 0,
    },
    productImages: [],
  },
});

export const userIdState = atom({
  key: 'userIdState',
  default: null,
});

export const cartState = atom({
  key: 'cartState',
  default: [],
});

export const wishlistState = atom({
  key: 'wishlistState',
  default: [],
});