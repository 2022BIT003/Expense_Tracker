import React, { useMemo } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import ProfileSection from "./components/ProfileSection";
import DashboardSection from "./components/DashboardSection";
import TransactionsSection from "./components/TransactionsSection";
import { useHomeLogic } from "../../hooks/useHomeLogic";
import { handleExport } from "./helpers/exportUtils";
import { calculateStats, getFilteredTransactions } from "./helpers/statsUtils";

const Home = () => {
    const {
        currentUser,
        loading,
        transactions,
        frequency,
        setFrequency,
        activeSection,
        handleSectionChange,
        handleLogout,
        values,
        handleChange,
        handleSubmit,
        handleReceiptData,
        showEditProfileModal,
        setShowEditProfileModal,
        profileName,
        setProfileName,
        profileAvatarPreview,
        handleProfileAvatarChange,
        handleProfileSave,
        profileSaving,
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
        toastOptions,
        triggerRefresh
    } = useHomeLogic();

    // Memoize calculated values for performance
    const stats = useMemo(() => calculateStats(transactions), [transactions]);
    
    const filteredTransactions = useMemo(() => 
        getFilteredTransactions(transactions, {
            transactionFilter,
            filterCategory,
            filterStartDate,
            filterEndDate,
            filterAmountMin,
            filterAmountMax
        }), 
        [transactions, transactionFilter, filterCategory, filterStartDate, filterEndDate, filterAmountMin, filterAmountMax]
    );

    const periodLabel = frequency === "1" ? "Daily" : frequency === "7" ? "Weekly" : frequency === "month" ? "Monthly" : frequency === "year" ? "Yearly" : "All Time";
    
    const pageHeading = activeSection === "dashboard"
        ? "Dashboard"
        : activeSection === "profile"
            ? "Profile"
            : "Transactions";
            
    const pageSubtitle = activeSection === "profile"
        ? "Manage your account details and settings."
        : "Add, export and filter income and expense history from one combined transaction page.";

    return (
        <div className="min-h-screen bg-slate-50">
            <Header currentUser={currentUser} />

            <div className="flex">
                <Sidebar
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    onLogout={handleLogout}
                />

                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {/* Page Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                    {pageHeading}
                                </h1>
                                <p className="text-slate-600">
                                    {pageSubtitle}
                                </p>
                            </div>

                            {activeSection === "profile" ? (
                                <ProfileSection
                                    currentUser={currentUser}
                                    showEditProfileModal={showEditProfileModal}
                                    setShowEditProfileModal={setShowEditProfileModal}
                                    profileName={profileName}
                                    setProfileName={setProfileName}
                                    profileAvatarPreview={profileAvatarPreview}
                                    onAvatarFileChange={handleProfileAvatarChange}
                                    handleProfileSave={handleProfileSave}
                                    profileSaving={profileSaving}
                                />
                            ) : (
                                <>
                                    {activeSection === "dashboard" ? (
                                        <DashboardSection
                                            {...stats}
                                            periodLabel={periodLabel}
                                            frequency={frequency}
                                            setFrequency={setFrequency}
                                            transactions={transactions}
                                            onRefresh={triggerRefresh}
                                        />
                                    ) : (
                                        <TransactionsSection
                                            values={values}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                            transactionFilter={transactionFilter}
                                            setTransactionFilter={setTransactionFilter}
                                            handleExport={(f) => handleExport(transactions, f, toastOptions)}
                                            showTransactionFilters={showTransactionFilters}
                                            setShowTransactionFilters={setShowTransactionFilters}
                                            filteredTransactions={filteredTransactions}
                                            filterStartDate={filterStartDate}
                                            setFilterStartDate={setFilterStartDate}
                                            filterEndDate={filterEndDate}
                                            setFilterEndDate={setFilterEndDate}
                                            filterCategory={filterCategory}
                                            setFilterCategory={setFilterCategory}
                                            filterAmountMin={filterAmountMin}
                                            setFilterAmountMin={setFilterAmountMin}
                                            filterAmountMax={filterAmountMax}
                                            setFilterAmountMax={setFilterAmountMax}
                                            onRefresh={triggerRefresh}
                                            handleReceiptData={handleReceiptData}
                                            toastOptions={toastOptions}
                                        />
                                    )}

                                </>
                            )}
                        </>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
