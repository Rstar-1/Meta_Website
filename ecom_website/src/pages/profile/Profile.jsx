import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Modal from "../../components/common/Modal";
import FormBuilder from "../../components/common/FormBuilder";
import Breadcrumb from "../../components/common/Breadcrumb";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth) || {};

    const defaultUser = {
        _id: user?._id || "6a7071416c3fd8730d886bba",
        fullname: user?.fullname || "akib",
        email: user?.email || "akib@gmail.com",
        mobile: user?.mobile || "8907654321",
        role: user?.role || "user",
        status: user?.status !== undefined ? (user.status ? "Active" : "Inactive") : "Active",
        isOtpVerified: user?.isOtpVerified !== undefined ? (user.isOtpVerified ? "Verified" : "Not Verified") : "Verified",
        createdAt: user?.createdAt ? new Date(user.createdAt).toLocaleString() : "2026-08-03, 10:45:21 AM",
        lastLogin: user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "2026-08-03, 10:45:32 AM",
        avatar: user?.image || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
        memberSince: "Aug 3, 2026"
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: defaultUser.fullname,
        email: defaultUser.email,
        mobile: defaultUser.mobile,
        _id: defaultUser._id,
        role: defaultUser.role,
        status: defaultUser.status,
        isOtpVerified: defaultUser.isOtpVerified,
        createdAt: defaultUser.createdAt,
        lastLogin: defaultUser.lastLogin
    });

    const [avatarSrc, setAvatarSrc] = useState(defaultUser.avatar);
    const [toast, setToast] = useState({ show: false, message: "" });
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 991);
    const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 991);
            setIsSmallMobile(window.innerWidth < 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                _id: user._id || defaultUser._id,
                fullname: user.fullname || defaultUser.fullname,
                email: user.email || defaultUser.email,
                mobile: user.mobile || defaultUser.mobile,
                role: user.role || defaultUser.role,
                status: user.status !== undefined ? (user.status ? "Active" : "Inactive") : defaultUser.status,
                isOtpVerified: user.isOtpVerified !== undefined ? (user.isOtpVerified ? "Verified" : "Not Verified") : defaultUser.isOtpVerified,
                createdAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : defaultUser.createdAt,
                lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : defaultUser.lastLogin
            });
            if (user.image) setAvatarSrc(user.image);
        }
    }, [user]);

    const triggerToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarSrc(reader.result);
                triggerToast("Avatar updated successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (data) => {
        setFormData(prev => ({
            ...prev,
            fullname: data.fullname,
            email: data.email,
            mobile: data.mobile
        }));
        setIsEditing(false);
        triggerToast("Profile information updated successfully!");
    };

    const handlePasswordSubmit = (data) => {
        setPasswordError("");
        if (data.newPass !== data.confirmPass) {
            setPasswordError("New passwords do not match.");
            return;
        }
        setIsPasswordModalOpen(false);
        triggerToast("Password changed successfully!");
    };

    const styles = {
        wrapper: { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 0" },
        headerContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
        breadcrumb: { fontSize: "13px", color: "#64748b", marginTop: "4px" },
        breadcrumbSpan: { cursor: "pointer", marginRight: "4px" },
        gridLayout: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "320px 1fr", gap: "30px", alignItems: "start" },
        card: { background: "#ffffff", borderRadius: "16px", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)", border: "1px solid #f1f5f9", padding: "30px", marginBottom: "24px" },
        avatarContainer: { position: "relative", width: "130px", height: "130px", margin: "0 auto 20px auto" },
        avatarImg: { width: "130px", height: "130px", borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 10px 15px -3px rgba(99,102,241,0.15)" },
        avatarCamera: { position: "absolute", bottom: "4px", right: "4px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
        name: { fontSize: "20px", fontWeight: "600", color: "#1e293b", textAlign: "center", marginBottom: "4px" },
        email: { fontSize: "13.5px", color: "#64748b", textAlign: "center", marginBottom: "16px" },
        badgeVerified: { background: "#dcfce7", color: "#15803d", fontSize: "12px", fontWeight: "600", padding: "5px 14px", borderRadius: "9999px", display: "inline-block", margin: "0 auto", textAlign: "center" },
        divider: { height: "1px", background: "#f1f5f9", margin: "24px 0" },
        detailItem: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
        detailIcon: { width: "36px", height: "36px", borderRadius: "50%", background: "#f1f5f9", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" },
        detailInfo: { display: "flex", flexDirection: "column" },
        detailLabel: { fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" },
        detailValue: { fontSize: "13.5px", fontWeight: "500", color: "#334155" },
        inputGroup: { marginBottom: "6px" },
        label: { fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "8px", display: "block" },
        inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
        inputIcon: { position: "absolute", left: "16px", color: "#94a3b8" },
        input: { width: "100%", padding: "12px 16px 12px 46px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", color: "#334155", outline: "none", transition: "all 0.2s" },
        sectionTitleContainer: { position: "relative", marginBottom: "24px" },
        sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#1e293b", margin: "0 0 8px 0" },
        sectionTitleUnderline: { height: "2px", width: "48px", background: "#6366f1" },
        toastNotification: { position: "fixed", bottom: "24px", right: "24px", background: "#1e293b", color: "#fff", padding: "14px 24px", borderRadius: "8px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "10px", zIndex: 9999, transform: toast.show ? "translateY(0)" : "translateY(100px)", opacity: toast.show ? 1 : 0, transition: "all 0.3s" }
    };

    const detailsConfig = [
        { label: "Member Since", value: defaultUser.memberSince, icon: "Clock" },
        { label: "Phone", value: formData.mobile, icon: "Phone" },
        { label: "OTP Verification", value: formData.isOtpVerified, icon: "Shield", color: formData.isOtpVerified === "Verified" ? "#15803d" : "#ef4444" },
        { label: "Account Status", value: formData.status, icon: "Users", color: formData.status === "Active" ? "#15803d" : "#94a3b8" }
    ];

    const fieldsConfig = [
        { label: "Full Name", name: "fullname", type: "text", disabled: !isEditing, defaultValue: formData.fullname, validation: { required: true } },
        { label: "Email Address", name: "email", type: "email", disabled: !isEditing, defaultValue: formData.email, validation: { required: true, email: true } },
        { label: "Phone Number", name: "mobile", type: "text", disabled: !isEditing, defaultValue: formData.mobile, validation: { required: true, mobile: true } },
        { label: "Role (Read-only)", name: "role", type: "text", disabled: true, defaultValue: formData.role },
        { label: "Account Status (Read-only)", name: "status", type: "text", disabled: true, defaultValue: formData.status },
        { label: "OTP Verification Status (Read-only)", name: "isOtpVerified", type: "text", disabled: true, defaultValue: formData.isOtpVerified },
        { label: "Account Created At (Read-only)", name: "createdAt", type: "text", disabled: true, defaultValue: formData.createdAt },
        { label: "Last Login Time (Read-only)", name: "lastLogin", type: "text", disabled: true, defaultValue: formData.lastLogin }
    ].map(f => ({
        ...f,
        iconPosition: "left",
        style: {
            backgroundColor: f.disabled ? "#f8fafc" : "#ffffff",
            cursor: f.disabled ? "not-allowed" : "text"
        }
    }));

    const passwordFieldsConfig = [
        { label: "Current Password", name: "current", type: "password", validation: { required: true } },
        { label: "New Password", name: "newPass", type: "password", validation: { required: true, minLength: 6 } },
        { label: "Confirm New Password", name: "confirmPass", type: "password", validation: { required: true } }
    ];

    return (
        <div style={styles.wrapper}>
            <Container>
                <div className="w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="title-text text-dark font-600">Profile</h2>
                            <Breadcrumb
                                items={[
                                    { label: "Home", path: "/" },
                                    { label: "Profile" }
                                ]}
                                colorClass="text-gray"
                            />
                        </div>
                        <Button
                            bg={isEditing ? "danger" : "primary"}
                            color="white"
                            version="v2"
                            onClick={() => setIsEditing(!isEditing)}
                            text={isEditing ? "Cancel Edit" : "Edit Profile"}
                            icon='Edit'
                        />
                    </div>

                    <div className="mt-16 flex items-start w-full gap-12">
                        {/* Left Card */}
                        <div className="w-30">
                            <div className="bg-white p-28 rounded-10">
                                <div style={styles.avatarContainer}>
                                    <img src={avatarSrc} alt="Profile Avatar" style={styles.avatarImg} />
                                    <div style={styles.avatarCamera} onClick={handleCameraClick}>
                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                            <circle cx="12" cy="13" r="4"></circle>
                                        </svg>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
                                </div>
                                <h2 style={styles.name}>{formData.fullname}</h2>
                                <p style={styles.email}>{formData.email}</p>
                                <div style={{ textAlign: "center", marginBottom: "8px" }}>
                                    <span style={styles.badgeVerified}>
                                        {formData.role === "admin" ? "Administrator" : "Verified User"}
                                    </span>
                                </div>
                                <div style={styles.divider} />
                                {detailsConfig.map((item, idx) => (
                                    <div key={idx} style={styles.detailItem}>
                                        <div style={styles.detailIcon}>
                                            <Icon name={item.icon} width="16" height="16" stroke="currentColor" />
                                        </div>
                                        <div style={styles.detailInfo}>
                                            <span style={styles.detailLabel}>{item.label}</span>
                                            <span style={{ ...styles.detailValue, color: item.color || styles.detailValue.color }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                                <div style={styles.divider} />
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    style={{
                                        width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e0e7ff", backgroundColor: "#f5f3ff", color: "#6366f1", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer"
                                    }}
                                >
                                    <Icon name="Lock" width="14" height="14" stroke="currentColor" />
                                    Change Password
                                </button>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="w-70">
                            <div className="bg-white p-28 rounded-10">
                                <div style={styles.sectionTitleContainer}>
                                    <h2 style={styles.sectionTitle}>Personal Information</h2>
                                    <div style={styles.sectionTitleUnderline} />
                                </div>
                                <FormBuilder
                                    key={`${isEditing}-${JSON.stringify(formData)}`}
                                    fields={fieldsConfig}
                                    onSubmit={handleProfileSubmit}
                                    submitType="json"
                                    col={isSmallMobile ? "1" : "2"}
                                    submitText="Save Changes"
                                    buttonBg="primary"
                                    buttonVersion="v2"
                                    buttonClassName={isEditing ? "flex justify-end mt-24" : "hidden"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* PASSWORD UPDATE MODAL */}
            <Modal isOpen={isPasswordModalOpen} onClose={() => { setIsPasswordModalOpen(false); setPasswordError(""); }} title="Change Password" size="sm" footer={null}>
                <div className="py-10">
                    {passwordError && (
                        <div style={{ marginBottom: "16px", padding: "12px", borderRadius: "6px", backgroundColor: "#fef2f2" }}>
                            <p className="mini-text font-500 text-danger" style={{ margin: 0 }}>{passwordError}</p>
                        </div>
                    )}
                    <FormBuilder
                        key={isPasswordModalOpen}
                        fields={passwordFieldsConfig}
                        onSubmit={handlePasswordSubmit}
                        submitType="json"
                        col="1"
                        submitText="Update Password"
                        buttonBg="primary"
                        buttonVersion="v3"
                        buttonClassName="w-full mt-16"
                    />
                </div>
            </Modal>

            {/* TOAST */}
            <div style={styles.toastNotification}>
                <Icon name="Check" width="20" height="20" stroke="#10b981" strokeWidth="3" />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{toast.message}</span>
            </div>
        </div>
    );
};

export default Profile;
