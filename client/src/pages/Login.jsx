import React from "react";
import LoginImage from "../assets/png/login-img.jpg";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "../recoil/atom";
import axios from "axios";

export default function Login() {
  // Store userID after login to use later, I think?
  const setUserId = useSetRecoilState(userIdState);
  const userId = useRecoilValue(userIdState);
  console.log("Before Login:",userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/login",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    //   console.log(response);
      if (response.data.status === "ok") {
        alert("Login Success");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); 
        // WARN : right here
        // setUserId(response.data.userId);
        // console.log("After Login:",userId);
        window.location = "/";
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
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
            <h1 className="text-5xl font-bold">Log in to GadgetHouse</h1>
            <br />
            <p className="text-xl">Enter your details below</p>
            <br />
            <hr />
            <br />

            <form onSubmit={handleSubmit}>
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-8">
                <button className="btn btn-accent text-white">Log In</button>
                <label className="label">
                  <a
                    href="/register"
                    className="label-text-alt link link-hover"
                  >
                    Don't have an account?
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
