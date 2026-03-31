// SignupPage.js
import { useEffect, useState } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "../../utils/axiosInstance";
import "./auth.css";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = values;

        setLoading(true);

        try {
            const { data } = await axios.post(registerAPI, {
                name,
                email,
                password
            });

            if (data.success === true) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success(data.message, toastOptions);
                navigate("/");
            }
            else {
                toast.error(data.message, toastOptions);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error during registration", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="glass-card">
                <div className="auth-icon-wrapper">
                    <div className="auth-icon">
                        <AccountBalanceWalletIcon sx={{ fontSize: 48 }} />
                    </div>
                </div>

                <h2 className="auth-title">Registration</h2>
                <p className="auth-subtitle">Create an account to track expenses</p>

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label className="auth-label" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="auth-input"
                            placeholder="Enter your full name"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label className="auth-label" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <div className="auth-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="auth-input"
                                name="password"
                                placeholder="Create a password"
                                onChange={handleChange}
                                value={values.password}
                                required
                            />
                            <div
                                className="password-toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Registering…" : "Signup"}
                    </button>

                    <div className="auth-links">
                        <p className="auth-footer-text">
                            Already have an account?{" "}
                            <Link to="/login" className="auth-link">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;