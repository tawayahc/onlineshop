import React, { useState } from 'react'
import ButtonRadio from '../../ButtonRadio'

function AddressList({ onClick }) {
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleRadioClick = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  return (
    <div className="flex flex-col m-4">
      <h1 className="font-bold text-2xl">ที่อยู่จัดส่ง</h1>
      <div className="form-control space-y-2 mt-4">
        <ButtonRadio
          label="ชำระเงินปลายทาง"
          value="option1"
          isSelected={selectedValue === "option1"}
          onClick={handleRadioClick}
          content = {"ชื่อ-นามสกุล ที่อยู่ ต.บ้านนา อ.เมือง จ.จันทบุรี 11111 0611111111"}
          className="h-full"
        />
        <ButtonRadio
          label="ชำระด้วยบัตร [xxxx xxxx xxxx xxxx]"
          value="option2"
          isSelected={selectedValue === "option2"}
          onClick={handleRadioClick}
          content = {"ชื่อ-นามสกุล ที่อยู่ ต.บ้านนา อ.เมือง จ.จันทบุรี 11111 0611111111 ชื่อ-นามสกุล ที่อยู่ ต.บ้านนา อ.เมือง จ.จันทบุรี 11111 0611111111"}
        />
        <button className="btn btn-outline btn-accent" onClick={onClick}>
          + เพิ่ม
        </button>
      </div>
    </div>
  )
}

export default AddressList