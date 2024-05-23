import { selector,atom } from "recoil";
import axios from "axios";
import { currentProductDetailState } from "./atom";

export const productDetailSelector = selector({
  key: 'productDetail',
  get: ({ get }) => {
    return get(currentProductDetailState);
  }
});

export const loadingCurrentProductDetail = atom({
  key: 'loadingCurrentProductDetail',
  default: true,
});