import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import InformationCard from "../../components/User/InformationCard";
import ApproveModal from "../../components/ApproveModal";
import Modal from "../../components/Modal";
import NewPaymentModal from "../../components/User/PaymentMethod/NewPaymentModal";
import { useRecoilValue, useResetRecoilState, useRecoilState } from "recoil";
import {
  addPaymentModalState,
  editPaymentModalState,
  deletePaymentModalState,
  paymentFormDataState,
  paymentListState,
} from "../../recoil/userInfo";
import usePayMethodActions from "../../API/userPayMethodActions";

function UserPayOptionPage() {
  const [showAddPaymentModal, setShowAddPaymentModal] = useRecoilState(addPaymentModalState);
  const [showEditPaymentModal, setShowEditPaymentModal] = useRecoilState(editPaymentModalState);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useRecoilState(deletePaymentModalState);
  const [paymentFormData, setPaymentFormData] = useRecoilState(paymentFormDataState);
  const resetFormData = useResetRecoilState(paymentFormDataState);

  const userId = localStorage.getItem("userId");
  const {
    fetchPaymentMethod,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  } = usePayMethodActions(userId);
  const paymentList = useRecoilValue(paymentListState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPaymentMethod().finally(() => setLoading(false));
  }, [fetchPaymentMethod]);

  const openAddPaymentModal = () => {
    resetFormData();
    setShowAddPaymentModal(true);
  };
  const closeAddPaymentModal = () => {
    setShowAddPaymentModal(false);
  };

  const openEditPaymentModal = (paymentId) => {
    const paymentToEdit = paymentList.find((payment) => payment.PaymentMethodID === paymentId);
    if (paymentToEdit) {
      setPaymentFormData(paymentToEdit);
      setShowEditPaymentModal(true);
    }
  };

  const closeEditPaymentModal = () => {
    setShowEditPaymentModal(false);
  };

  const openDeletePaymentModal = (paymentId) => {
    const paymentToDelete = paymentList.find((payment) => payment.PaymentMethodID === paymentId);
    if (paymentToDelete) {
      setPaymentFormData(paymentToDelete);
      setShowDeletePaymentModal(true);
    }
  };

  const closeDeletePaymentModal = () => {
    setShowDeletePaymentModal(false);
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

  const handleDeletePayment = (paymentId) => {
    setLoading(true);
    deletePaymentMethod(paymentId).finally(() => {
      console.log("Deleted payment method with ID:", paymentId);
      closeDeletePaymentModal();
      fetchPaymentMethod().finally(() => setLoading(false));
    });
  };

  console.log(paymentList);

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body">
          <h2 className="card-title flex flex-col items-start">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex font-bold text-xl">ช่องทางการชําระเงิน</div>
              <button className="btn btn-accent" onClick={openAddPaymentModal}>
                เพิ่มการชําระเงิน
              </button>
            </div>
            <div className="divider m-0"></div>
          </h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col gap-4">
              {paymentList.map((payment) => (
                <InformationCard
                  key={payment.PaymentMethodID}
                  type="payment"
                  data={payment}
                  onEdit={() => openEditPaymentModal(payment.PaymentMethodID)}
                  onDelete={() => openDeletePaymentModal(payment.PaymentMethodID)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={showAddPaymentModal} onClose={closeAddPaymentModal} onSubmit={() => handleSubmitPayment(paymentFormData)}>
        <NewPaymentModal/>
      </Modal>

      <Modal isOpen={showEditPaymentModal} onClose={closeEditPaymentModal} onSubmit={() => handleSubmitPayment(paymentFormData)}>
        <NewPaymentModal/>
      </Modal>

      <ApproveModal
        isOpen={showDeletePaymentModal}
        onClose={closeDeletePaymentModal}
        onSubmit={() => handleDeletePayment(paymentFormData.PaymentMethodID)}
      />
    </div>
  );
}

export default () => (
  <Layout>
    <UserLayout>
      <UserPayOptionPage />
    </UserLayout>
  </Layout>
);
