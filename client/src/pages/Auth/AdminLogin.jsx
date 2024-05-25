import React, { useState } from "react";
import { LogoSVG } from "../../assets/images";
import axios from "axios";

function AdminLogin() {
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/admin/auth/login",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Login Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("staffId", response.data.staffId);
        window.location = "/admin/products";
      } else {
        alert("Login Failed");
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // setError("An error occurred during login");
    }
  };

  return (
    <div className="font-noto bg-neutral">
      <div className="hero min-h-screen">
        <div className="hero-content w-full flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white lg:ml-[5%]">
            <img src={LogoSVG} className="max-w-sm rounded-lg" alt="Logo" />
            <br /><hr />
            <h1 className="text-5xl font-bold mt-4">Staff Login</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
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
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
                <label className="label">
                  <a
                    href="/admin/register"
                    className="label-text-alt link link-hover"
                  >
                    Don't have an account?
                  </a>
                </label>
              </div>
              {error && (
                <div className="text-red-500 mt-4 text-center">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
