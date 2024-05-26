import { atom } from 'recoil';

export const customerReviewsState = atom({
  key: 'customerReviewsState',
  default: [],
});

export const customerServiceRequestsState = atom({
  key: 'customerServiceRequestsState',
  default: [],
});

export const reviewModalState = atom({
  key: 'reviewModalState',
  default: {
    isOpen: false,
    mode: 'add',
    review: null,
  },
});

export const requestModalState = atom({
  key: 'requestModalState',
  default: {
    isOpen: false,
    mode: 'add',
    request: null,
  },
});
