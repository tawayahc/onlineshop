import React from "react";
import Layout from "../../components/Layout/Layout";
import ProductCart from "../../components/User/ProductCart";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="font-noto">
      <div className="flex flex-col justify-center content-center items-center w-1/3 mx-auto">
        <h1 className="text-5xl font-bold">Your Cart Items</h1>
        <div className="divider "></div>
        <button className="btn btn-wide btn-error">Back to Shop</button>
      </div>
      <div className="flex flex-row justify-between mx-10 2xl:mx-48 ">
        <div className="overflow-x-auto mt-4  ">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>สินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>ราคาทั้งหมด</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {Array.from({ length: 10 }, (_, index) => (
                <ProductCart
                  avatar="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                  name="Product Name Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Optio aspernatur obcaecati deleniti quis laudantium impedit
              repellat voluptatibus ex blanditiis facere ratione, suscipit
              explicabo aliquid aperiam rerum delectus ullam id dolor?"
                  price="4000"
                  quantity={5}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-2">สรุปการสั่งซื้อ</h2>
              <div className="flex flex-row justify-between">
                <p>ยอดรวมสินค้า</p>
                <p className="font-bold text-right">ราคาสินค้า</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>ค่าจัดส่ง</p>
                <p className="font-bold text-right">ฟรี</p>
              </div>
              <div className="divider my-2"></div>
              <div className="flex flex-row justify-between mb-4">
                <h1 className="text-xl">ยอดสุทธิ</h1>
                <h1 className="text-xl font-bold text-right">ราคาสินค้า</h1>
              </div>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-wide btn-error"
                  onClick={handleCheckout}
                >
                  ทำการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <CartPage />
  </Layout>
);
