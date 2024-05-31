import React from "react";
import { paymentFormDataState } from "../../../recoil/userInfo";
import { useRecoilState } from "recoil";

function NewPaymentModal() {
  const [paymentFormData, setPaymentFormData] = useRecoilState(paymentFormDataState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col m-4">
      <h1 className="font-bold text-2xl">เพิ่มบัตรเครดิต/บัตรเดบิต</h1>
      <h1 className="text-xl my-4">ข้อมูลบัตร</h1>
      <div className="flex flex-col space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">หมายเลขบัตร</span>
          </label>
          <input
            type="text"
            name="CardNumber"
            placeholder="xxxx xxxx xxxx xxxx"
            className="input input-bordered"
            value={paymentFormData.CardNumber || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="form-control w-3/4 mr-4">
            <label className="label">
              <span className="label-text">วันหมดอายุ (ดด/ปป)</span>
            </label>
            <input
              type="text"
              name="CardExpiry"
              placeholder="MM/YY"
              className="input input-bordered"
              value={paymentFormData.CardExpiry || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control w-1/4">
            <label className="label">
              <span className="label-text">CVV</span>
            </label>
            <input
              type="text"
              name="cvc"
              placeholder="CVV"
              className="input input-bordered"
              value={paymentFormData.cvc || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">ชื่อเจ้าของบัตร</span>
          </label>
          <input
            type="text"
            name="CardName"
            placeholder="ชื่อเจ้าของบัตร"
            className="input input-bordered"
            value={paymentFormData.CardName || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPaymentModal;
