import {atom, selector} from "recoil";

export const userInfoState = atom({
  key: 'userInfoState',
  default: [],
})

// ADDRESS
export const addAddressModalState = atom({
  key: 'addAddressModalState',
  default: false,
});

export const editAddressModalState = atom({
  key: 'editAddressModalState',
  default: false,
});

export const deleteAddressModalState = atom({
  key: 'deleteAddressModalState',
  default: false,
});

export const addressListState = atom({
  key: 'addressListState',
  default: [],
})
export const addressFormDataState = atom({
  key: 'addressFormDataState',
  default: [],
});

// PAYMENT
export const addPaymentModalState = atom({
  key: 'addPaymentModalState',
  default: false,
});

export const editPaymentModalState = atom({
  key: 'editPaymentModalState',
  default: false,
});

export const deletePaymentModalState = atom({
  key: 'deletePaymentModalState',
  default: false,
});

export const paymentListState = atom({
  key: 'paymentListState',
  default: [],
})

export const paymentFormDataState = atom({
  key: 'paymentFormDataState',
  default: [],
});
