import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png";

const Header = () => {
    const navigate = useNavigate();

    const handleShowLogin = () => {
        navigate("/login");
    };

    const [user, setUser] = useState();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
        }
    }, []);


    const handleShowLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }



    return (
        <>
            <div>
                <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: "2 !important" }}>
                    {/* <Navbar className="navbarCSS" collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
                    <Navbar.Brand href="/" className="text-white navTitle d-flex align-items-center">
                        <img src={logo} alt="Expense Tracker Logo" style={{ height: '80px', objectFit: 'contain', marginRight: '10px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                        }}
                    >
                        <span
                            className="navbar-toggler-icon"
                            style={{
                                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                            }}
                        ></span>
                    </Navbar.Toggle>
                    <div>
                        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
                            {user ? (
                                <Nav className="ms-auto d-flex align-items-center">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.5px' }}>
                                            Hi, {user.name || "User"}
                                        </span>

                                        {user.isAvatarImageSet && user.avatarImage && (
                                            <img
                                                src={user.avatarImage}
                                                alt="avatar"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #0ea5e9',
                                                    boxShadow: '0 0 12px rgba(14, 165, 233, 0.4)',
                                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        )}

                                        <Button variant="outline-danger" onClick={handleShowLogout} className="ms-3" style={{ borderRadius: '8px', padding: '6px 16px', fontWeight: 500 }}>
                                            Logout
                                        </Button>
                                    </div>
                                </Nav>
                            ) : (
                                <Nav className="ms-auto">
                                    <Button variant="primary" onClick={handleShowLogin} style={{ borderRadius: '8px', padding: '6px 20px', fontWeight: 500 }}>
                                        Login
                                    </Button>
                                </Nav>
                            )}
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        </>
    );
};

export default Header;
