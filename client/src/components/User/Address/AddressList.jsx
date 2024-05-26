import React, { useState } from "react";
import ButtonRadio from "../../ButtonRadio";
import { addressListState } from "../../../recoil/userInfo";
import { useRecoilValue } from "recoil";

function AddressList({ onClick, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const addressList = useRecoilValue(addressListState);

  const handleRadioClick = (value) => {
    setSelectedValue(value);
    const selectedAddress = addressList.find((item) => item.ShippingAddressID === value);
    onSelect(selectedAddress);
  };

  return (
    <div className="flex flex-col m-4 max-w-lg ">
      <h1 className="font-bold text-2xl">ที่อยู่จัดส่ง</h1>
      <div className="form-control space-y-2 mt-4">
        {addressList.map((item) => (
          <ButtonRadio
            key={item.ShippingAddressID}
            label={item.FullName + " " + item.PhoneNumber + " " + item.Address + " " + item.SubDistrict + " " + item.District + " " + item.Province + " " + item.PostalCode}
            value={item.ShippingAddressID}
            isSelected={selectedValue === item.ShippingAddressID}
            onClick={handleRadioClick}
          />
        ))}
        <button className="btn btn-outline btn-accent" onClick={onClick}>
          + เพิ่ม
        </button>
      </div>
    </div>
  );
}

export default AddressList;
