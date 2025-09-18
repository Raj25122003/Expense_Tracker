import React from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

const AuthPage = () => {
    return (
        <div className="auth-page">
            <div className="login-form">
                <Login />
            </div>
            <div className="signup-form">
                <SignUp />
            </div>
        </div>
    );
};

export default AuthPage;
