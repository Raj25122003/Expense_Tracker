import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/api";
import './AuthPage.css';  // Add your custom styles for modern design

const SignUp = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData); 
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Error creating account");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-heading">Sign Up</h2>
                <div className="auth-field">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="auth-input"
                    />
                </div>
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
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
