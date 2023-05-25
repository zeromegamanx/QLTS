import React from "react";
function Login() {
    return (
        <>
            <div className="h-max z-10">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <img
                            src="logo_kse.jpg"
                          
                            className="mb-4 rounded-md shadow-md"
                            alt="KSE_LOGO"
                        />
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control ">
                            <label className="label cursor-pointer justify-start gap-5">
                                <input type="checkbox" className="checkbox checkbox-primary" />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary grow">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;