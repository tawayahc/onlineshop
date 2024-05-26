import { atom } from "recoil";

export const orderState = atom({
  key: "orderState",
  default: [],
});

export const orderListState = atom({
  key: "orderListState",
  default: [],
})