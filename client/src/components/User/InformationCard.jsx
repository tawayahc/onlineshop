import React from "react";
import { useRecoilState } from "recoil";
import {
  editAddressModalState,
  addressFormDataState,
  editPaymentModalState,
  paymentFormDataState,
} from "../../recoil/userInfo";

function InformationCard({ data, type, onEdit, onDelete }) {
  const [, setShowEditAddressModal] = useRecoilState(editAddressModalState);
  const [, setAddressFormData] = useRecoilState(addressFormDataState);
  const [, setShowEditPaymentModal] = useRecoilState(editPaymentModalState);
  const [, setPaymentFormData] = useRecoilState(paymentFormDataState);

  const handleEdit = () => {
    if (type === "address") {
      setAddressFormData(data);
      setShowEditAddressModal(true);
    } else if (type === "payment") {
      setPaymentFormData(data);
      setShowEditPaymentModal(true);
    }
  };

  return (
    <div className="card card-bordered bg-primary">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-bold">
              {type === "address" && data.FullName + " " + data.PhoneNumber}
              {type === "payment" && data.CardName}
            </p>
            <p className="">
              {type === "address" &&
                data.Address +
                  " " +
                  data.SubDistrict +
                  " " +
                  data.District +
                  " " +
                  data.Province +
                  " " +
                  data.PostalCode}
              {type === "payment" &&
                "xxxx xxxx xxxx " + data.CardNumber + " " + data.CardExpiry}
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="btn btn-circle btn-outline" onClick={handleEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
                  <path d="M12.5 15.8 22 6.2 17.8 2l-9.5 9.5L8 16l4.5-.2z" />
                </g>
              </svg>
            </button>
            <button
              className="btn btn-circle btn-outline btn-error"
              onClick={onDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationCard;
