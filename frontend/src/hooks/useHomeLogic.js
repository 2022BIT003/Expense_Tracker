import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "../utils/axiosInstance";
import { 
    addTransaction, 
    getTransactions, 
    setAvatarAPI, 
    updateProfileAPI 
} from "../utils/ApiRequest";
import { MAX_AVATAR_SIZE_BYTES, readImageAsDataUrl } from "../utils/avatarHelpers";

export const useHomeLogic = () => {
    const navigate = useNavigate();
    const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
    const { signOut } = useAuth();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    // State
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [frequency, setFrequency] = useState("all");
    const [type, setType] = useState("all");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transactionFilter, setTransactionFilter] = useState("all");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterAmountMin, setFilterAmountMin] = useState("");
    const [filterAmountMax, setFilterAmountMax] = useState("");
    const [showTransactionFilters, setShowTransactionFilters] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileAvatar, setProfileAvatar] = useState("");
    const [profileAvatarPreview, setProfileAvatarPreview] = useState("");
    const [profileSaving, setProfileSaving] = useState(false);
    const [values, setValues] = useState({
        title: "",
        amount: "",
        description: "",
        category: "",
        date: "",
        transactionType: "",
    });

    // Auth sync with Clerk and Backend
    useEffect(() => {
        const syncUser = async () => {
            if (isUserLoaded && clerkUser) {
                try {
                    // Try to fetch the local profile from our backend
                    const { data } = await axios.get(updateProfileAPI);
                    if (data.success) {
                        setCurrentUser(data.user);
                    } else {
                        // Fallback to Clerk data if backend fetch fails
                        setCurrentUser({
                            _id: clerkUser.id,
                            name: clerkUser.fullName,
                            email: clerkUser.primaryEmailAddress?.emailAddress,
                            avatarImage: clerkUser.imageUrl,
                            isAvatarImageSet: true
                        });
                    }
                } catch (err) {
                    console.error("Failed to fetch local profile:", err);
                    // Fallback to Clerk data
                    setCurrentUser({
                        _id: clerkUser.id,
                        name: clerkUser.fullName,
                        email: clerkUser.primaryEmailAddress?.emailAddress,
                        avatarImage: clerkUser.imageUrl,
                        isAvatarImageSet: true
                    });
                }
            }
        };
        syncUser();
    }, [isUserLoaded, clerkUser]);

    // Sync profile state with currentUser
    useEffect(() => {
        setProfileName(currentUser?.name || "");
        setProfileAvatar("");
        setProfileAvatarPreview(currentUser?.avatarImage || "");
    }, [currentUser]);

    // Fetch transactions
    const fetchAllTransactions = useCallback(async () => {
        if (!clerkUser) return;
        try {
            setLoading(true);
            const { data } = await axios.post(getTransactions, {
                frequency,
                startDate,
                endDate,
                type,
            });
            setTransactions(data.transactions);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [frequency, startDate, endDate, type, clerkUser]);

    useEffect(() => {
        if (clerkUser) {
            fetchAllTransactions();
        }
    }, [refresh, clerkUser, fetchAllTransactions]);

    // Handlers
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, amount, description, category, date, transactionType } = values;

        if (!title || !amount || !description || !category || !date || !transactionType) {
            toast.error("Please enter all the fields", toastOptions);
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(addTransaction, values);
            if (data.success) {
                toast.success(data.message, toastOptions);
                setRefresh(prev => !prev);
                setValues({
                    title: "",
                    amount: "",
                    description: "",
                    category: "",
                    date: "",
                    transactionType: "",
                });
            } else {
                toast.error(data.message, toastOptions);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding transaction", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setType("all");
        if (section === "transactions") {
            setTransactionFilter("all");
        }
        setFrequency("all");
        setStartDate(null);
        setEndDate(null);
    };

    const handleLogout = () => {
        signOut();
        navigate("/login");
    };

    const handleProfileSave = async () => {
        if (!profileName.trim()) {
            toast.error("Name is required", toastOptions);
            return;
        }

        try {
            setProfileSaving(true);
            const profileRes = await axios.put(updateProfileAPI, { name: profileName.trim() });
            const avatarRes = profileAvatar
                ? await axios.post(`${setAvatarAPI}/${currentUser?._id}`, { image: profileAvatar })
                : null;

            const data = profileRes.data;
            if (data.success) {
                const updatedUser = {
                    ...data.user,
                    avatarImage: avatarRes?.data?.image ?? data.user.avatarImage,
                    isAvatarImageSet: avatarRes?.data?.isSet ?? data.user.isAvatarImageSet,
                };
                setCurrentUser(updatedUser);
                toast.success(data.message, toastOptions);
                setShowEditProfileModal(false);
                setProfileAvatar("");
            } else {
                toast.error(data.message || "Failed to update profile", toastOptions);
            }
        } catch (err) {
            if (err.response?.status === 413) {
                toast.error("Image is too large. Choose a smaller one.", toastOptions);
            } else {
                toast.error(err.response?.data?.message || "Failed to update profile", toastOptions);
            }
        } finally {
            setProfileSaving(false);
        }
    };

    const handleProfileAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_AVATAR_SIZE_BYTES) {
            toast.error("File size should be less than 1.5MB", toastOptions);
            return;
        }
        const imageData = await readImageAsDataUrl(file);
        setProfileAvatar(imageData);
        setProfileAvatarPreview(imageData);
    };

    const triggerRefresh = () => setRefresh(prev => !prev);

    const handleReceiptData = (data) => {
        setValues({
            title: data.title || "",
            amount: data.amount || "",
            description: data.description || "",
            category: data.category || "",
            date: data.date || "",
            transactionType: data.transactionType || "expense",
        });
    };

    return {
        currentUser,
        loading,
        transactions,
        frequency,
        setFrequency,
        activeSection,
        handleSectionChange,
        handleLogout,
        // Transaction Form
        values,
        handleChange,
        handleSubmit,
        handleReceiptData,
        // Profile
        showEditProfileModal,
        setShowEditProfileModal,
        profileName,
        setProfileName,
        profileAvatarPreview,
        handleProfileAvatarChange,
        handleProfileSave,
        profileSaving,
        // Filters
        transactionFilter,
        setTransactionFilter,
        filterStartDate,
        setFilterStartDate,
        filterEndDate,
        setFilterEndDate,
        filterCategory,
        setFilterCategory,
        filterAmountMin,
        setFilterAmountMin,
        filterAmountMax,
        setFilterAmountMax,
        showTransactionFilters,
        setShowTransactionFilters,
        // Other
        toastOptions,
        triggerRefresh
    };
};
