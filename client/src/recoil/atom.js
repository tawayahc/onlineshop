import { atom } from 'recoil';

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const productsState = atom({
  key: 'productsState',
  default: [],
});

export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const productsPerPageState = atom({
  key: 'productsPerPageState',
  default: 20,
});

export const selectedFiltersState = atom({
  key: 'selectedFiltersState',
  default: {
    category: [],
    priceRange: [0, 100000],
    rating: []
  },
});

export const userState = atom({
  key: 'userState',
  default: null,
})

export const cartState = atom({
  key: 'cartState',
  default: [],
})

export const wishlistState = atom({
  key: 'wishlistState',
  default: [],
})

