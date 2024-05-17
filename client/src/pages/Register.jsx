import React, { useState } from "react";
import LoginImage from "../assets/png/login-img.jpg";
import axios from "axios";

export default function Register() {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
      fname: data.get("fname"),
      lname: data.get("lname"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/register",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.data.status === "ok") {
        alert("Register Success");
        window.location = "/login";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 h-screen ">
        <div className="flex bg-white justify-center items-center">
          <img src={LoginImage}></img>
        </div>
        <div className="flex bg-white justify-center items-center px-[10%]">
          <div className="card shrink-0 w-full ">
            <h1 className="text-5xl font-bold">Create an account</h1>
            <br />
            <p className="text-xl">Enter your details below</p>
            <br />
            <hr />
            <br />

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2">
                <div className="form-control mr-2">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    name="fname"
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control ml-2">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    name="lname"
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
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
                <span className="label-text-alt mt-2 text-red-500">
                {error}
                </span>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="create password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                  type="password"
                  placeholder="comfirm password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-8">
                <button className="btn btn-accent text-white">
                  Create Account
                </button>
                <label className="label">
                  <a href="login" className="label-text-alt link link-hover">
                    Already have an account?
                  </a>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
