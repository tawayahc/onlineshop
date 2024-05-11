import React from 'react'
import LoginImage from '../assets/png/login-img.jpg'

export default function Login() {
  return (
    <>
        <div className='grid grid-cols-2 h-screen '>
            <div className='flex bg-white justify-center items-center'>
                <img src={ LoginImage }></img>
            </div>
            <div className='flex bg-white justify-center items-center px-[10%]'>
                <div className='card shrink-0 w-full '>

                    <h1 className='text-5xl font-bold'>Log in to GadgetHouse</h1><br />
                    <p className='text-xl'>Enter your details below</p><br /><hr /><br />

                    <form className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-8">
                            <button className="btn btn-accent text-white">Log In</button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Don't have an account?</a>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </>
  )
}
