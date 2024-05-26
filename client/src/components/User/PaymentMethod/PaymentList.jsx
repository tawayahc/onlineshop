import React, { useState } from "react";
import ButtonRadio from "../../ButtonRadio";
import { paymentListState } from "../../../recoil/userInfo";
import { useRecoilValue } from "recoil";

function PaymentList({ onClick, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const paymentList = useRecoilValue(paymentListState);

  const handleRadioClick = (value) => {
    setSelectedValue(value);
    const selectedPayment = paymentList.find((item) => item.PaymentMethodID === value);
    onSelect(selectedPayment);
  };

  return (
    <div className="flex flex-col m-4">
      <h1 className="font-bold text-2xl">ช่องทางการชําระเงิน</h1>
      <div className="form-control space-y-2 mt-4">
        <ButtonRadio
          label="ชำระเงินปลายทาง"
          value="ชำระเงินปลายทาง"
          isSelected={selectedValue === "ชำระเงินปลายทาง"}
          onClick={handleRadioClick}
        />
        {paymentList.map((item) => (
          <ButtonRadio
            key={item.PaymentMethodID}
            label={"xxxx xxxx xxxx " + item.CardNumber}
            value={item.PaymentMethodID}
            isSelected={selectedValue === item.PaymentMethodID}
            onClick={handleRadioClick}
          />
        ))}
      </div>
    </div>
  );
}

export default PaymentList;
