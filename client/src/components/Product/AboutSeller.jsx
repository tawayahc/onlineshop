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
          <p>Contact</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">ดูเพิ่มเติม</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSeller;
