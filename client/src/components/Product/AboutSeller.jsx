import React from "react";

function AboutSeller() {
  return (
    // TODO : Get data from database
    // NOTE: ต้องแยกด้วยว่าเป็น official ไหม
    <div className="p-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Vendor Name</h2>
          <p>Rating</p>
          <p>Description</p>
          <div className="mt-2">
              <div className="badge badge-outline mr-2">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSeller;
