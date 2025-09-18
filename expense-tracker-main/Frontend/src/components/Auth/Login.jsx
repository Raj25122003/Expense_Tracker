import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import './AuthPage.css';  // Add your custom styles for modern design

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-heading">Login</h2>
                <div className="auth-field">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="auth-input"
                    />
                </div>
                <div className="auth-field">
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="auth-input"
                    />
                </div>
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
