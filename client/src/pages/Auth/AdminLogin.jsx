import React from "react";
import { LogoSVG } from "../../assets/images";

function AdminLogin() {
  return (
    <div className="font-noto bg-neutral">
      <div className="hero min-h-screen">
        <div className="hero-content w-full flex-col lg:flex-row-reverse">
          
          <div className="text-center lg:text-left text-white">
          <img
            src={LogoSVG}
            className="max-w-sm rounded-lg "
          />
            <h1 className="text-5xl font-bold mt-4">Login now!</h1>
            <p className="text-xl py-6">
              ร่วมขายสินค้ากับเรา
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
