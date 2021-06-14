import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
 

  return (
    <div>
      <div className="h-100 w-100 bg-color">
        <div className="login-box">
          <div className="login-logo">
            <span>
              <strong style={{ fontSize: "20px" }}>COVID HELP</strong>
            </span>
          </div>

          <div className="form-group mt-3 mb-0">
            <p>
              <Link to="/superadminlogin">
                Click here to login as Super Administrator
              </Link>
            </p>
            <p>
              <Link to="/adminlogin">
                {" "}
                Click here to login as Administrator
              </Link>
            </p>

   <p>
              <Link to="/volunteerlogin">
                {" "}
                Click here to login as Volunteer
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
