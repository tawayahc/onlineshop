import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal";
import PaymentList from "../../components/User/PaymentMethod/PaymentList";
import NewPaymentModal from "../../components/User/PaymentMethod/NewPaymentModal";
import AddressList from "../../components/User/Address/AddressList";
import NewAddressModal from "../../components/User/Address/NewAddressModal";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import {
  addAddressModalState,
  editAddressModalState,
  addressFormDataState,
  addressListState,
  addPaymentModalState,
  editPaymentModalState,
  paymentFormDataState,
  paymentListState,
} from "../../recoil/userInfo";
import {
  cartState,
  totalPriceState,
  totalQuantityState,
} from "../../recoil/cart";
import usePayMethodActions from "../../API/userPayMethodActions";
import { useAddressActions } from "../../API/userAddressActions";
import useCartActions from "../../API/userCartActions";
import useOrderActions from "../../API/userOrderActions";

function CheckoutPage() {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] =
    useRecoilState(addAddressModalState);
  const [showEditAddressModal, setShowEditAddressModal] = useRecoilState(
    editAddressModalState
  );
  const [addressFormData, setAddressFormData] =
    useRecoilState(addressFormDataState);
  const resetFormDataAddress = useResetRecoilState(addressFormDataState);
  const [showAddPaymentModal, setShowAddPaymentModal] =
    useRecoilState(addPaymentModalState);
  const [showEditPaymentModal, setShowEditPaymentModal] = useRecoilState(
    editPaymentModalState
  );
  const [paymentFormData, setPaymentFormData] =
    useRecoilState(paymentFormDataState);
  const resetFormDataPayment = useResetRecoilState(paymentFormDataState);

  const { fetchPaymentMethod, addPaymentMethod, updatePaymentMethod } =
    usePayMethodActions(userId);
  const paymentList = useRecoilValue(paymentListState);

  const { fetchShippingAddress, updateShippingAddress, addShippingAddress } =
    useAddressActions(userId);
  const addressList = useRecoilValue(addressListState);

  const { fetchCart } = useCartActions(userId);
  const [cart, setCart] = useRecoilState(cartState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalQuantity, setTotalQuantity] = useRecoilState(totalQuantityState);

  useEffect(() => {
    setLoading(true);
    fetchPaymentMethod().finally(() => setLoading(false));
    setLoading(true);
    fetchShippingAddress().finally(() => setLoading(false));
    setLoading(true);
    fetchCart().finally(() => setLoading(false));
  }, []);

  const displayAddress = (address) => (
    <p>
      {address.FullName}, {address.PhoneNumber}, {address.Address},{" "}
      {address.SubDistrict}, {address.District}, {address.Province},{" "}
      {address.PostalCode}
    </p>
  );

  const [showPaymentList, setShowPaymentList] = useState(false);
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const { processOrder } = useOrderActions(userId);
  const handleSubmitOrder = async () => {
    const orderData = {
      userId,
      selectedAddress,
      selectedPayment,
      cart,
      totalPrice,
      totalQuantity,
      status: "Processing",
      expectedDate: new Date().toISOString().split("T")[0]
    };
    console.log(orderData);
    setLoading(true);
    processOrder(orderData).finally(() => setLoading(false));
  };

  const openAddAddressModal = () => {
    resetFormDataAddress();
    setShowAddAddressModal(true);
  };

  const closeAddAddressModal = () => {
    setShowAddAddressModal(false);
  };

  const openEditAddressModal = (addressId) => {
    const addressToEdit = addressList.find(
      (address) => address.ShippingAddressID === addressId
    );
    if (addressToEdit) {
      setAddressFormData(addressToEdit);
      setShowEditAddressModal(true);
    }
  };

  const closeEditAddressModal = () => {
    setShowEditAddressModal(false);
  };

  const openAddressList = () => {
    setShowAddressList(true);
  };
  const closeAddressList = () => {
    setShowAddressList(false);
  };

  const handleSubmitAddress = (formData) => {
    const isEdit = !!formData.ShippingAddressID;
    const action = isEdit ? updateShippingAddress : addShippingAddress;

    if (typeof action === "function") {
      action(formData).finally(() => {
        if (isEdit) {
          closeEditAddressModal();
        } else {
          closeAddAddressModal();
        }
        fetchShippingAddress();
      });
    } else {
      console.error("Error: action is not a function");
    }
  };

  const openAddPaymentModal = () => {
    resetFormDataPayment();
    setShowAddPaymentModal(true);
  };
  const closeAddPaymentModal = () => {
    setShowAddPaymentModal(false);
  };

  const openEditPaymentModal = (paymentId) => {
    const paymentToEdit = paymentList.find(
      (payment) => payment.PaymentMethodID === paymentId
    );
    if (paymentToEdit) {
      setPaymentFormData(paymentToEdit);
      setShowEditPaymentModal(true);
    }
  };

  const closeEditPaymentModal = () => {
    setShowEditPaymentModal(false);
  };

  const openPaymentList = () => {
    setShowPaymentList(true);
  };
  const closePaymentList = () => {
    setShowPaymentList(false);
  };

  const handleSubmitPayment = (formData) => {
    const isEdit = !!formData.PaymentMethodID;
    const action = isEdit ? updatePaymentMethod : addPaymentMethod;

    if (typeof action === "function") {
      action(formData).finally(() => {
        if (isEdit) {
          closeEditPaymentModal();
        } else {
          closeAddPaymentModal();
        }
        setLoading(true);
        fetchPaymentMethod().finally(() => setLoading(false));
      });
    } else {
      console.error("action is not a function");
    }
  };

  return (
    <div className="font-noto">
      <div className="flex flex-row justify-between mx-48">
        <div className="flex flex-col gap-4">
          {addressList && addressList.length > 0 ? (
            <div className="card w-[450px] 2xl:w-[800px] bg-primary text-primary-content card-bordered">
              <div className="card-body">
                <h2 className="card-title">ที่อยู่จัดส่ง</h2>
                <div>
                  <div>
                    {selectedAddress
                      ? displayAddress(selectedAddress)
                      : "เลือกที่อยู่จัดส่ง"}
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn" onClick={openAddressList}>
                    เปลี่ยน
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="btn btn-outline btn-accent w-[450px] 2xl:w-[800px] h-24 no-animation "
              onClick={openAddAddressModal}
            >
              เพิ่มที่อยู่จัดส่ง
            </div>
          )}

          {paymentList && paymentList.length > 0 ? (
            <div className="card w-[450px] 2xl:w-[800px] bg-primary text-primary-content card-bordered">
              <div className="card-body">
                <h2 className="card-title">ช่องทางการชําระเงิน</h2>
                <p>
                  {selectedPayment
                    ? "xxxx xxxx xxxx " + selectedPayment.CardNumber
                    : "เลือกช่องทางการชําระเงิน"}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn" onClick={openPaymentList}>
                    เปลี่ยน
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="btn btn-outline btn-accent w-[450px] 2xl:w-[800px] h-24 no-animation "
              onClick={openAddPaymentModal}
            >
              เพิ่มช่องทางการชําระเงิน
            </div>
          )}
        </div>
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-2">สรุปการสั่งซื้อ</h2>
              <div className="flex flex-row justify-between">
                <p>ยอดรวมสินค้า</p>
                <p className="font-bold text-right">฿{totalPrice}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>ค่าจัดส่ง</p>
                <p className="font-bold text-right">ฟรี</p>
              </div>
              <div className="divider my-2"></div>
              <div className="flex flex-row justify-between mb-4">
                <h1 className="text-xl">ยอดสุทธิ</h1>
                <h1 className="text-xl font-bold text-right">฿{totalPrice}</h1>
              </div>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-wide btn-error"
                  onClick={handleSubmitOrder}
                >
                  ทำการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <Modal isOpen={showPaymentList} onClose={closePaymentList}>
        <PaymentList
          onClick={openAddPaymentModal}
          onSelect={setSelectedPayment}
        />
      </Modal>

      <Modal
        isOpen={showAddPaymentModal}
        onClose={closeAddPaymentModal}
        onSubmit={() => handleSubmitPayment(paymentFormData)}
      >
        <NewPaymentModal />
      </Modal>

      <Modal
        isOpen={showEditPaymentModal}
        onClose={closeEditPaymentModal}
        onSubmit={() => handleSubmitPayment(paymentFormData)}
      >
        <NewPaymentModal />
      </Modal>

      {/* Address */}
      <Modal isOpen={showAddressList} onClose={closeAddressList}>
        <AddressList
          onClick={openAddAddressModal}
          onSelect={setSelectedAddress}
        />
      </Modal>

      <Modal
        isOpen={showAddAddressModal}
        onClose={closeAddAddressModal}
        onSubmit={() => handleSubmitAddress(addressFormData)}
      >
        <NewAddressModal />
      </Modal>

      <Modal
        isOpen={showEditAddressModal}
        onClose={closeEditAddressModal}
        onSubmit={() => handleSubmitAddress(addressFormData)}
      >
        <NewAddressModal />
      </Modal>
    </div>
  );
}

export default () => (
  <Layout>
    <CheckoutPage />
  </Layout>
);
