import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="main_container">
        <div className="email_container">
          <label htmlFor="">Email</label>
          <input type="email" name="" id="" />
        </div>
        <div className="pass_container">
          <label htmlFor="">Password</label>
          <input type="password" name="" id="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
