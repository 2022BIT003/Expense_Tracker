import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axiosInstance";
import spinner from "../../assets/gg.gif";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "../Auth/auth.css";
import "./avatar.css";
import { setAvatarAPI } from "../../utils/ApiRequest.js";

const SetAvatar = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);

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

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1.5 * 1024 * 1024) {
                toast.error("File size should be less than 1.5MB", toastOptions);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setPreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const setProfilePicture = async () => {
        if (!selectedImage) {
            toast.error("Please upload an image first", toastOptions);
        } else {
            setLoading(true);
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
                    image: selectedImage,
                });

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("user", JSON.stringify(user));
                    toast.success("Avatar updated successfully", toastOptions);
                    navigate("/");
                } else {
                    toast.error("Error setting avatar, please try again", toastOptions);
                }
            } catch (err) {
                toast.error("Something went wrong", toastOptions);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="login-page">
            {loading ? (
                <div className="loading-spinner">
                    <img src={spinner} alt="Loading" />
                </div>
            ) : (
                <div className="avatar-container">
                    <div className="glass-card" style={{ maxWidth: '550px', width: '90%' }}>

                        <h2 className="auth-title">Profile Picture</h2>
                        <p className="auth-subtitle mb-4">Upload a photo from your system to personalize your profile</p>

                        <div className="avatarBox">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            <div
                                className={`upload-zone ${previewURL ? 'has-preview' : ''}`}
                                onClick={handleUploadClick}
                            >
                                {previewURL ? (
                                    <img src={previewURL} alt="Preview" className="upload-preview" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <CloudUploadIcon sx={{ fontSize: 64, color: 'rgba(56, 189, 248, 0.4)' }} />
                                        <p>Click to browse or drag and drop</p>
                                        <span className="upload-hint">JPG, PNG (max 1.5MB)</span>
                                    </div>
                                )}

                                {previewURL && (
                                    <div className="change-photo-overlay">
                                        <AddAPhotoIcon />
                                        <span>Change Photo</span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={setProfilePicture}
                                type="button"
                                className="auth-btn mt-4"
                                style={{ maxWidth: '300px' }}
                                disabled={!selectedImage}
                            >
                                Set as Profile Picture
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </div>
    );
};

export default SetAvatar;
