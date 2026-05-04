import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import axios from "../../utils/axiosInstance";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { setAvatarAPI } from "../../utils/ApiRequest.js";
import Spinner from "../../components/Spinner";
import { MAX_AVATAR_SIZE_BYTES, readImageAsDataUrl } from "../../utils/avatarHelpers";

const SetAvatar = () => {
    const navigate = useNavigate();
    const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
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
        if (isUserLoaded && !clerkUser) {
            navigate("/login");
        }
    }, [isUserLoaded, clerkUser, navigate]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_AVATAR_SIZE_BYTES) {
                toast.error("File size should be less than 1.5MB", toastOptions);
                return;
            }

            const imageData = await readImageAsDataUrl(file);
            setSelectedImage(imageData);
            setPreviewURL(imageData);
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
                // The backend protect middleware will identify the user from the Clerk token
                const { data } = await axios.post(`${setAvatarAPI}/${clerkUser.id}`, {
                    image: selectedImage,
                });

                if (data.isSet) {
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
        <>
            <style>{`
                .login-page::before {
                    content: '';
                    position: absolute;
                    top: -20%;
                    left: -20%;
                    width: 80%;
                    height: 140%;
                    background: radial-gradient(circle at 30% 50%, rgba(18, 56, 117, 0.45) 0%, rgba(13, 22, 41, 0) 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                .login-page::after {
                    content: '';
                    position: absolute;
                    bottom: -10%;
                    right: -10%;
                    width: 50%;
                    height: 50%;
                    background: radial-gradient(circle at center, rgba(14, 165, 233, 0.05) 0%, rgba(13, 22, 41, 0) 70%);
                    pointer-events: none;
                    z-index: 0;
                }

                .change-photo-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(13, 22, 41, 0.8);
                    height: 35%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .upload-zone:hover .change-photo-overlay {
                    opacity: 1;
                }
            `}</style>
            <div className="login-page relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans m-0 p-0">
                {loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center w-full py-8">
                        <div className="relative z-10 bg-slate-900 border border-white border-opacity-5 rounded-3xl p-12 w-11/12 max-w-xl shadow-2xl flex flex-col">
                            {/* Title and Subtitle */}
                            <h2 className="text-white text-2xl font-bold text-center mb-2 -tracking-wider">Profile Picture</h2>
                            <p className="text-slate-500 text-center mb-8 text-sm">Upload a photo from your system to personalize your profile</p>

                            <div className="flex flex-col items-center w-full">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                {/* Upload Zone */}
                                <div
                                    className={`upload-zone relative w-72 h-72 border-2 border-dashed ${
                                        previewURL
                                            ? 'border-solid border-cyan-400 bg-cyan-500 bg-opacity-10'
                                            : 'border-cyan-400 border-opacity-30 hover:border-cyan-400 hover:bg-cyan-500 hover:bg-opacity-5'
                                    } rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden`}
                                    onClick={handleUploadClick}
                                >
                                    {previewURL ? (
                                        <>
                                            <img src={previewURL} alt="Preview" className="w-full h-full object-cover rounded-full" />
                                            <div className="change-photo-overlay">
                                                <AddAPhotoIcon />
                                                <span className="text-xs mt-1 font-semibold">Change Photo</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center px-5">
                                            <CloudUploadIcon sx={{ fontSize: 64, color: 'rgba(56, 189, 248, 0.4)' }} />
                                            <p className="mt-4 text-sm text-blue-100 opacity-80">Click to browse or drag and drop</p>
                                            <span className="text-xs text-slate-500">JPG, PNG (max 1.5MB)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <button
                                    onClick={setProfilePicture}
                                    type="button"
                                    className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-2 font-semibold text-base transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30 mt-8 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    disabled={!selectedImage}
                                >
                                    Set as Profile Picture
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SetAvatar;
