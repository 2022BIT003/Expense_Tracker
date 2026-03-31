// LoginPage.js
import { useEffect, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axiosInstance";
import { loginAPI } from "../../utils/ApiRequest";
import "./auth.css";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    const [values, setValues] = useState({
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
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;

        setLoading(true);

        try {
            const { data } = await axios.post(loginAPI, {
                email,
                password,
            });

            if (data.success === true) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
                toast.success(data.message, toastOptions);
            } else {
                toast.error(data.message, toastOptions);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error during login", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="glass-card">
                <div className="auth-icon-wrapper">
                    <div className="auth-icon">
                        <AccountBalanceWalletIcon />
                    </div>
                </div>

                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Log in to manage your expenses</p>

                <form onSubmit={handleSubmit}>
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
                                placeholder="Enter your password"
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
                        {loading ? "Signing in…" : "Login"}
                    </button>

                    <div className="auth-links">
                        <p className="auth-footer-text">
                            Don't have an account?{" "}
                            <Link to="/register" className="auth-link">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
