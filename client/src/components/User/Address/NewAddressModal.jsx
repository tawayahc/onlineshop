import React, { useState, useEffect } from "react";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";
import { addressFormDataState } from "../../../recoil/userInfo";
import { useRecoilState } from "recoil";

function NewAddressModal() {
  const [formData, setFormData] = useRecoilState(addressFormDataState);
  const [val, setVal] = useState(ThailandAddressValue.empty());

  useEffect(() => {
    if (formData.subdistrict || formData.district || formData.province || formData.postalCode) {
      setVal({
        subdistrict: formData.SubDistrict || '',
        district: formData.District || '',
        province: formData.Province || '',
        postalCode: formData.ZipCode || ''
      });
    }
  }, [formData]);

  const handleNameChange = (event) => {
    setFormData({ ...formData, FullName: event.target.value });
  };

  const handleContactChange = (event) => {
    setFormData({ ...formData, PhoneNumber: event.target.value });
  };

  const handleAddressChange = (event) => {
    setFormData({ ...formData, Address: event.target.value });
  };

  const handleThailandAddressChange = (val) => {
    setVal(val);
    setFormData({
      ...formData,
      SubDistrict: val.subdistrict,
      District: val.district,
      Province: val.province,
      ZipCode: val.postalCode,
    });
  };

  return (
    <div className="flex flex-col m-4 w-[896px] h-[500px]">
      <h1 className="font-bold text-2xl">ที่อยู่จัดส่ง</h1>
      <form>
        <div className="flex flex-row justify-between space-x-4 mt-4">
          <div className="flex flex-col w-full">
            <span className="text-sm mb-1">ชื่อ - นามสกุล</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.FullName || ''}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm mb-1">เบอร์ติดต่อ</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.PhoneNumber || ''}
              onChange={handleContactChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm mb-1">ที่อยู่</span>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full h-16"
            value={formData.Address || ''}
            onChange={handleAddressChange}
          />
        </div>
        <ThailandAddressTypeahead
          value={val}
          onValueChange={handleThailandAddressChange}
        >
          <div className="flex flex-row justify-between space-x-4 mt-4">
            <div className="w-1/2">
              <span className="text-sm mb-1">ตำบล / แขวง</span>
              <ThailandAddressTypeahead.SubdistrictInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
            <div className="w-1/2">
              <span className="text-sm mb-1">อำเภอ / เขต</span>
              <ThailandAddressTypeahead.DistrictInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-4 mt-4">
            <div className="w-1/2 mt-2">
              <span className="text-sm mb-1">จังหวัด</span>
              <ThailandAddressTypeahead.ProvinceInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
            <div className="w-1/2 mt-2">
              <span className="text-sm mb-1">รหัสไปรษณีย์</span>
              <ThailandAddressTypeahead.PostalCodeInput
                className="input input-bordered w-full"
                placeholder=""
              />
            </div>
          </div>
          <ThailandAddressTypeahead.Suggestion
            containerProps={{
              className:
                "absolute max-h-40 overflow-y-auto bg-primary p-1 shadow-md rounded-md border border-gray-300",
            }}
            optionItemProps={{
              className: "text-lg cursor-pointer hover:bg-gray-300",
            }}
          />
        </ThailandAddressTypeahead>
      </form>
    </div>
  );
}

export default NewAddressModal;
