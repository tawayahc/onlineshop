import React from 'react'
import LoginImage from '../assets/png/login-img.jpg'

export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            email: data.get('email'),
            password: data.get('password'),
            fname: "FakeFname",
            lname: "KafeLname"
        }

        try {
            fetch("http://localhost:3333/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    alert("Register Success");
                } else {
                    alert("Register Failed");
                }
            })
            
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <>
        <div className='grid grid-cols-2 h-screen '>
            <div className='flex bg-white justify-center items-center'>
                <img src={ LoginImage }></img>
            </div>
            <div className='flex bg-white justify-center items-center px-[10%]'>
                <div className='card shrink-0 w-full '>

                    <h1 className='text-5xl font-bold'>Create an account</h1><br />
                    <p className='text-xl'>Enter your details below</p><br /><hr /><br />

                    <form onSubmit={ handleSubmit }>
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="naem" type="text" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="create password" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <input type="password" placeholder="comfirm password" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-8">
                            <button className="btn btn-accent text-white">Create Account</button>
                            <label className="label">
                                <a href="login" className="label-text-alt link link-hover">Already have an account?</a>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </>
  )
}
