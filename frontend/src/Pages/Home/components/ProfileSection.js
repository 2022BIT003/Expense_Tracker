import React from "react";

const ProfileSection = ({
    currentUser,
    showEditProfileModal,
    setShowEditProfileModal,
    profileName,
    setProfileName,
    profileAvatarPreview,
    onAvatarFileChange,
    handleProfileSave,
    profileSaving,
}) => {
    return (
        <>
            <div className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Profile Information</h2>
                    
                    {/* Avatar Display */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <img
                                src={currentUser?.avatarImage || "https://via.placeholder.com/150"}
                                alt="Profile Avatar"
                                className="h-32 w-32 rounded-full object-cover border-4 border-slate-100 shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                                onClick={() => setShowEditProfileModal(true)}
                                className="absolute bottom-1 right-1 bg-slate-900 text-white p-2 rounded-full shadow-lg hover:bg-slate-800 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-slate-500 font-medium">Click to update your photo</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                            <span className="text-slate-600 font-medium">Name</span>
                            <span className="text-slate-900 font-semibold">{currentUser?.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                            <span className="text-slate-600 font-medium">Email</span>
                            <span className="text-slate-900 font-semibold">{currentUser?.email}</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => setShowEditProfileModal(true)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {showEditProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Edit Profile</h3>
                            <button
                                type="button"
                                className="text-slate-500 hover:text-slate-700"
                                onClick={() => setShowEditProfileModal(false)}
                            >
                                x
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={profileName}
                                    onChange={(e) => setProfileName(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Avatar Image</label>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                                    onChange={onAvatarFileChange}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                />
                            </div>
                            {profileAvatarPreview && (
                                <div className="mt-3 flex justify-center">
                                    <img
                                        src={profileAvatarPreview}
                                        alt="Avatar Preview"
                                        className="h-20 w-20 rounded-full object-cover border border-slate-300"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                onClick={() => setShowEditProfileModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                                onClick={handleProfileSave}
                                disabled={profileSaving}
                            >
                                {profileSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileSection;
