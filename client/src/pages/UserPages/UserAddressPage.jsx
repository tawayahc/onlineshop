import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import InformationCard from "../../components/User/InformationCard";
import Modal from "../../components/Modal";
import NewAddressModal from "../../components/User/Address/NewAddressModal";
import ApproveModal from "../../components/ApproveModal";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { 
  addAddressModalState, 
  editAddressModalState, 
  deleteAddressModalState,
  addressFormDataState,
  addressListState
} from "../../recoil/userInfo";
import { useAddressActions } from "../../API/userAddressActions";

function UserAddressPage() {
  const [showAddAddressModal, setShowAddAddressModal] = useRecoilState(addAddressModalState);
  const [showEditAddressModal, setShowEditAddressModal] = useRecoilState(editAddressModalState);
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useRecoilState(deleteAddressModalState);
  const [addressFormData, setAddressFormData] = useRecoilState(addressFormDataState);
  const resetFormData = useResetRecoilState(addressFormDataState);

  const userId = localStorage.getItem("userId");
  const { fetchShippingAddress, updateShippingAddress, addShippingAddress, deleteShippingAddress } = useAddressActions(userId);
  const addressList = useRecoilValue(addressListState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchShippingAddress().finally(() => setLoading(false));
  }, []);

  const openAddAddressModal = () => {
    resetFormData();
    setShowAddAddressModal(true);
  };

  const closeAddAddressModal = () => {
    setShowAddAddressModal(false);
  };

  const openEditAddressModal = (addressId) => {
    const addressToEdit = addressList.find(address => address.ShippingAddressID === addressId);
    if (addressToEdit) {
      setAddressFormData(addressToEdit);
      setShowEditAddressModal(true);
    }
  };

  const closeEditAddressModal = () => {
    setShowEditAddressModal(false);
  };

  const openDeleteAddressModal = (addressId) => {
    const addressToDelete = addressList.find(address => address.ShippingAddressID === addressId);
    if (addressToDelete) {
      setAddressFormData(addressToDelete);
      setShowDeleteAddressModal(true);
    }
  };

  const closeDeleteAddressModal = () => {
    setShowDeleteAddressModal(false);
  };

  const handleSubmitAddress = (formData) => {
    const isEdit = !!formData.ShippingAddressID;
    const action = isEdit ? updateShippingAddress : addShippingAddress;

    if (typeof action === 'function') {
      action(formData).finally(() => {
        if (isEdit) {
          closeEditAddressModal();
        } else {
          closeAddAddressModal();
        }
        fetchShippingAddress();
      });
    } else {
      console.error('Error: action is not a function');
    }
  };

  const handleDeleteAddress = (addressId) => {
    setLoading(true);
    deleteShippingAddress(addressId).finally(() => {
      closeDeleteAddressModal();
      fetchShippingAddress().finally(() => setLoading(false));
    });
  };

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body">
          <h2 className="card-title flex flex-col items-start">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex font-bold text-xl">ที่อยู่ของฉัน</div>
              <button className="btn btn-accent" onClick={openAddAddressModal}>
                เพิ่มที่อยู่
              </button>
            </div>
            <div className="divider m-0"></div>
          </h2>
         {loading ? (
            <div>loading...</div>
          ) : (
            addressList.map((address) => (
              <InformationCard
                key={address.ShippingAddressID}
                type="address"
                data={address}
                onEdit={() => openEditAddressModal(address.ShippingAddressID)}
                onDelete={() => openDeleteAddressModal(address.ShippingAddressID)}
              />
            ))
          )}
        </div>
      </div>
      <Modal isOpen={showAddAddressModal} onClose={closeAddAddressModal} onSubmit={() => handleSubmitAddress(addressFormData)}>
        <NewAddressModal />
      </Modal>

      <Modal isOpen={showEditAddressModal} onClose={closeEditAddressModal} onSubmit={() => handleSubmitAddress(addressFormData)}>
        <NewAddressModal />
      </Modal>

      <ApproveModal
        isOpen={showDeleteAddressModal}
        onClose={closeDeleteAddressModal}
        onSubmit={() => handleDeleteAddress(addressFormData.ShippingAddressID)}
      />
    </div>
  );
}

export default () => (
  <Layout>
    <UserLayout>
      <UserAddressPage />
    </UserLayout>
  </Layout>
);
