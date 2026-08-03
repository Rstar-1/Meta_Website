import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Modal from "../../components/common/Modal";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth) || {};

    // Default mock fallback values to match screenshot/guarantee WOW layout
    const defaultUser = {
        fullname: user?.fullname || "Yuvraj Shaik",
        email: user?.email || "yuvraj@example.com",
        mobile: user?.mobile || "+91 98765 43210",
        dob: "15 May 1995",
        gender: "Male",
        location: user?.address?.[0]?.city
            ? `${user.address[0].city}, ${user.address[0].state || "India"}`
            : "Mumbai, India",
        bio: "Passionate about technology and building user-friendly products.",
        memberSince: "May 15, 2024",
        totalOrders: 24,
        totalSpent: "₹28,450.00"
    };

    // State Declarations
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: defaultUser.fullname,
        email: defaultUser.email,
        mobile: defaultUser.mobile,
        dob: defaultUser.dob,
        gender: defaultUser.gender,
        location: defaultUser.location,
        bio: defaultUser.bio
    });

    const [avatarSrc, setAvatarSrc] = useState(
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop"
    );

    const [toast, setToast] = useState({ show: false, message: "" });

    // Modals state
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirmPass: "" });
    const [passwordError, setPasswordError] = useState("");

    const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);
    const [sessions, setSessions] = useState([
        { id: 1, device: "Windows 11", browser: "Chrome", location: "Mumbai, India", isCurrent: true, activeTime: "Current Session" },
        { id: 2, device: "iPhone 15 Pro", browser: "Safari", location: "Pune, India", isCurrent: false, activeTime: "Active 2 hours ago" },
        { id: 3, device: "macOS", browser: "Brave", location: "Delhi, India", isCurrent: false, activeTime: "Active 3 days ago" }
    ]);

    const fileInputRef = useRef(null);

    // Sync state if Redux user updates
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullname: user.fullname || prev.fullname,
                email: user.email || prev.email,
                mobile: user.mobile || prev.mobile
            }));
        }
    }, [user]);

    // Toast helper
    const triggerToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    // Avatar Upload Handlers
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

    // Profile Save Handler
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        triggerToast("Personal Information updated successfully!");
    };

    // Password Change Handler
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordError("");
        if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirmPass) {
            setPasswordError("All fields are required.");
            return;
        }
        if (passwordForm.newPass !== passwordForm.confirmPass) {
            setPasswordError("New passwords do not match.");
            return;
        }
        // Simulate successful password update
        setIsPasswordModalOpen(false);
        setPasswordForm({ current: "", newPass: "", confirmPass: "" });
        triggerToast("Password changed successfully!");
    };

    // Session Revoke Handler
    const handleRevokeSession = (id) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        triggerToast("Session terminated successfully.");
    };

    const handleRevokeAllSessions = () => {
        setSessions(prev => prev.filter(s => s.isCurrent));
        triggerToast("All other active sessions revoked.");
    };

    return (
        <div className="profile-page-wrapper">
            <style>{`
        .profile-page-wrapper {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 40px 0;
          font-family: 'Poppins', sans-serif;
        }
        .profile-header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .profile-breadcrumb {
          font-size: 13px;
          color: #64748b;
          margin-top: 4px;
        }
        .profile-grid-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 30px;
          align-items: start;
        }
        @media (max-width: 991px) {
          .profile-grid-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        .profile-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          padding: 30px;
          margin-bottom: 24px;
        }
        .profile-avatar-container {
          position: relative;
          width: 130px;
          height: 130px;
          margin: 0 auto 20px auto;
        }
        .profile-avatar-img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #fff;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.15);
        }
        .profile-avatar-camera {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        .profile-avatar-camera:hover {
          background: #f8fafc;
          transform: scale(1.1);
        }
        .profile-name {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          text-align: center;
          margin-bottom: 4px;
        }
        .profile-email {
          font-size: 13.5px;
          color: #64748b;
          text-align: center;
          margin-bottom: 16px;
        }
        .profile-badge-verified {
          background: #dcfce7;
          color: #15803d;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 9999px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
        }
        .profile-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 24px 0;
        }
        .profile-detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .profile-detail-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-detail-info {
          display: flex;
          flex-direction: column;
        }
        .profile-detail-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          line-height: 1.3;
        }
        .profile-detail-value {
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
        }
        .profile-input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 767px) {
          .profile-input-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .profile-input-group {
          margin-bottom: 6px;
        }
        .profile-label {
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 8px;
          display: block;
        }
        .profile-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .profile-input-icon {
          position: absolute;
          left: 16px;
          color: #94a3b8;
        }
        .profile-input {
          width: 100%;
          padding: 12px 16px 12px 46px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          color: #334155;
          outline: none;
          background-color: #fff;
          transition: all 0.2s ease;
        }
        .profile-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .profile-input:disabled {
          background-color: #f8fafc;
          color: #64748b;
          border-color: #e2e8f0;
          cursor: not-allowed;
        }
        .profile-section-title-container {
          position: relative;
          margin-bottom: 24px;
        }
        .profile-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 8px 0;
        }
        .profile-section-title-underline {
          height: 2px;
          width: 48px;
          background: #6366f1;
        }
        .profile-security-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          margin-bottom: 16px;
          transition: all 0.2s ease;
        }
        .profile-security-item:hover {
          border-color: #e2e8f0;
          background-color: #f8fafc;
        }
        .profile-security-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .profile-security-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #eef2ff;
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-security-title {
          font-size: 14.5px;
          font-weight: 600;
          color: #334155;
        }
        .profile-security-desc {
          font-size: 12.5px;
          color: #64748b;
          margin-top: 2px;
        }
        .profile-security-action {
          font-size: 13.5px;
          font-weight: 500;
          color: #6366f1;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: 1px solid #e0e7ff;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .profile-security-action:hover {
          background-color: #eef2ff;
          border-color: #6366f1;
        }
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1e293b;
          color: #fff;
          padding: 14px 24px;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 9999;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .toast-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

            <Container>
                <div className="w-full">
                    {/* Header and Breadcrumbs */}
                    <div className="profile-header-container">
                        <div>
                            <h1 className="head-text text-dark font-600">Profile</h1>
                            <div className="profile-breadcrumb">
                                <span onClick={() => navigate("/")}>Home</span> &gt; <span>Profile</span>
                            </div>
                        </div>
                        <Button
                            bg={isEditing ? "danger" : "primary"}
                            color="white"
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                backgroundColor: isEditing ? "#ef4444" : "#6366f1",
                                borderColor: isEditing ? "#ef4444" : "#6366f1",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                borderRadius: "8px"
                            }}
                        >
                            <Icon name="Edit" width="16" height="16" stroke="currentColor" />
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </Button>
                    </div>

                    {/* Grid Layout */}
                    <div className="profile-grid-layout">
                        {/* Left Column */}
                        <div>
                            <div className="profile-card">
                                {/* Avatar section */}
                                <div className="profile-avatar-container">
                                    <img
                                        src={avatarSrc}
                                        alt="Profile Avatar"
                                        className="profile-avatar-img"
                                    />
                                    <div className="profile-avatar-camera" onClick={handleCameraClick}>
                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                            <circle cx="12" cy="13" r="4"></circle>
                                        </svg>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {/* Name & Badge */}
                                <h2 className="profile-name">{formData.fullname}</h2>
                                <p className="profile-email">{formData.email}</p>
                                <div style={{ textAlign: "center", marginBottom: "8px" }}>
                                    <span className="profile-badge-verified">Verified User</span>
                                </div>

                                <div className="profile-divider" />

                                {/* Stats & Metadata Details */}
                                <div className="profile-detail-item">
                                    <div className="profile-detail-icon">
                                        <Icon name="Clock" width="16" height="16" stroke="currentColor" />
                                    </div>
                                    <div className="profile-detail-info">
                                        <span className="profile-detail-label">Member Since</span>
                                        <span className="profile-detail-value">{defaultUser.memberSince}</span>
                                    </div>
                                </div>

                                <div className="profile-detail-item">
                                    <div className="profile-detail-icon">
                                        <Icon name="Phone" width="16" height="16" stroke="currentColor" />
                                    </div>
                                    <div className="profile-detail-info">
                                        <span className="profile-detail-label">Phone</span>
                                        <span className="profile-detail-value">{formData.mobile}</span>
                                    </div>
                                </div>

                                <div className="profile-detail-item">
                                    <div className="profile-detail-icon">
                                        <Icon name="Orders" width="16" height="16" stroke="currentColor" />
                                    </div>
                                    <div className="profile-detail-info">
                                        <span className="profile-detail-label">Total Orders</span>
                                        <span className="profile-detail-value">{defaultUser.totalOrders}</span>
                                    </div>
                                </div>

                                <div className="profile-detail-item">
                                    <div className="profile-detail-icon">
                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                    </div>
                                    <div className="profile-detail-info">
                                        <span className="profile-detail-label">Total Spent</span>
                                        <span className="profile-detail-value">{defaultUser.totalSpent}</span>
                                    </div>
                                </div>

                                <div className="profile-detail-item">
                                    <div className="profile-detail-icon">
                                        <Icon name="Location" width="16" height="16" stroke="currentColor" />
                                    </div>
                                    <div className="profile-detail-info">
                                        <span className="profile-detail-label">Location</span>
                                        <span className="profile-detail-value">{formData.location}</span>
                                    </div>
                                </div>

                                <div className="profile-divider" />

                                {/* Change Password quick button */}
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e7ff",
                                        backgroundColor: "#f5f3ff",
                                        color: "#6366f1",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#e0e7ff"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f5f3ff"; }}
                                >
                                    <Icon name="Lock" width="14" height="14" stroke="currentColor" />
                                    Change Password
                                </button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Personal Info Form Card */}
                            <div className="profile-card">
                                <div className="profile-section-title-container">
                                    <h2 className="profile-section-title">Personal Information</h2>
                                    <div className="profile-section-title-underline" />
                                </div>

                                <form onSubmit={handleProfileSubmit}>
                                    <div className="profile-input-grid">
                                        {/* Full Name */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Full Name</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <Icon name="Users" width="16" height="16" stroke="currentColor" />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.fullname}
                                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Email Address</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <Icon name="Mail" width="16" height="16" stroke="currentColor" />
                                                </div>
                                                <input
                                                    type="email"
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Phone Number</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <Icon name="Phone" width="16" height="16" stroke="currentColor" />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.mobile}
                                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Date of Birth</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.dob}
                                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Gender dropdown */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Gender</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <Icon name="Users" width="16" height="16" stroke="currentColor" />
                                                </div>
                                                <select
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.gender}
                                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                    style={{ appearance: "none", cursor: isEditing ? "pointer" : "default" }}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div style={{ position: "absolute", right: "16px", pointerEvents: "none", color: "#64748b", display: "flex" }}>
                                                    <Icon name="ChevronDown" width="14" height="14" stroke="currentColor" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="profile-input-group">
                                            <label className="profile-label">Location</label>
                                            <div className="profile-input-wrapper">
                                                <div className="profile-input-icon">
                                                    <Icon name="Location" width="16" height="16" stroke="currentColor" />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="profile-input"
                                                    disabled={!isEditing}
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio text area */}
                                    <div className="profile-input-group" style={{ marginTop: "20px" }}>
                                        <label className="profile-label">Bio</label>
                                        <div style={{ position: "relative" }}>
                                            <textarea
                                                disabled={!isEditing}
                                                value={formData.bio}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 200) {
                                                        setFormData({ ...formData, bio: e.target.value });
                                                    }
                                                }}
                                                style={{
                                                    width: "100%",
                                                    height: "100px",
                                                    padding: "12px 16px",
                                                    borderRadius: "10px",
                                                    border: "1px solid #e2e8f0",
                                                    fontSize: "14px",
                                                    color: "#334155",
                                                    outline: "none",
                                                    resize: "none",
                                                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                                                    transition: "all 0.2s ease"
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
                                            />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                    right: "12px",
                                                    fontSize: "11px",
                                                    color: "#94a3b8"
                                                }}
                                            >
                                                {formData.bio.length}/200
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Changes Button */}
                                    {isEditing && (
                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                                            <Button
                                                type="submit"
                                                bg="primary"
                                                color="white"
                                                style={{
                                                    backgroundColor: "#6366f1",
                                                    borderColor: "#6366f1",
                                                    padding: "12px 30px",
                                                    borderRadius: "8px",
                                                    fontWeight: "600"
                                                }}
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Security Settings Card */}
                            <div className="profile-card">
                                <div className="profile-section-title-container">
                                    <h2 className="profile-section-title">Security Settings</h2>
                                    <div className="profile-section-title-underline" />
                                </div>

                                {/* Password change item */}
                                <div className="profile-security-item">
                                    <div className="profile-security-left">
                                        <div className="profile-security-icon-wrapper">
                                            <Icon name="Lock" width="18" height="18" stroke="currentColor" />
                                        </div>
                                        <div>
                                            <span className="profile-security-title">Password</span>
                                            <p className="profile-security-desc">Last changed 2 months ago</p>
                                        </div>
                                    </div>
                                    <div className="profile-security-action" onClick={() => setIsPasswordModalOpen(true)}>
                                        Change Password
                                        <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />
                                    </div>
                                </div>

                                {/* 2FA item */}
                                <div className="profile-security-item">
                                    <div className="profile-security-left">
                                        <div className="profile-security-icon-wrapper" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>
                                            <Icon name="Shield" width="18" height="18" stroke="currentColor" />
                                        </div>
                                        <div>
                                            <span className="profile-security-title">Two-Factor Authentication</span>
                                            <p className="profile-security-desc">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "#dcfce7",
                                            color: "#15803d",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            padding: "4px 12px",
                                            borderRadius: "9999px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => triggerToast("2FA configuration panel is currently locked.")}
                                    >
                                        Enabled
                                        <Icon name="ChevronRight" width="12" height="12" stroke="currentColor" />
                                    </div>
                                </div>

                                {/* Active Sessions item */}
                                <div className="profile-security-item">
                                    <div className="profile-security-left">
                                        <div className="profile-security-icon-wrapper" style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="profile-security-title">Active Sessions</span>
                                            <p className="profile-security-desc">Manage your active sessions</p>
                                        </div>
                                    </div>
                                    <div className="profile-security-action" onClick={() => setIsSessionsModalOpen(true)}>
                                        Manage Sessions
                                        <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* CHANGE PASSWORD MODAL */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordError("");
                    setPasswordForm({ current: "", newPass: "", confirmPass: "" });
                }}
                title="Change Password"
                size="sm"
                footer={null}
            >
                <form onSubmit={handlePasswordSubmit} style={{ padding: "10px 0" }}>
                    {passwordError && (
                        <div className="p-12 mb-16 rounded-5 bg-light-danger" style={{ marginBottom: "16px", padding: "12px", borderRadius: "6px" }}>
                            <p className="mini-text font-500 text-danger" style={{ margin: 0 }}>{passwordError}</p>
                        </div>
                    )}

                    <div className="profile-input-group">
                        <label className="profile-label">Current Password</label>
                        <div className="profile-input-wrapper">
                            <div className="profile-input-icon">
                                <Icon name="Lock" width="16" height="16" stroke="currentColor" />
                            </div>
                            <input
                                type="password"
                                className="profile-input"
                                style={{ paddingLeft: "46px" }}
                                placeholder="Enter current password"
                                value={passwordForm.current}
                                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="profile-input-group">
                        <label className="profile-label">New Password</label>
                        <div className="profile-input-wrapper">
                            <div className="profile-input-icon">
                                <Icon name="Lock" width="16" height="16" stroke="currentColor" />
                            </div>
                            <input
                                type="password"
                                className="profile-input"
                                style={{ paddingLeft: "46px" }}
                                placeholder="Enter new password"
                                value={passwordForm.newPass}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="profile-input-group" style={{ marginBottom: "24px" }}>
                        <label className="profile-label">Confirm New Password</label>
                        <div className="profile-input-wrapper">
                            <div className="profile-input-icon">
                                <Icon name="Lock" width="16" height="16" stroke="currentColor" />
                            </div>
                            <input
                                type="password"
                                className="profile-input"
                                style={{ paddingLeft: "46px" }}
                                placeholder="Confirm new password"
                                value={passwordForm.confirmPass}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        bg="primary"
                        color="white"
                        style={{
                            backgroundColor: "#6366f1",
                            borderColor: "#6366f1",
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            fontWeight: "600"
                        }}
                    >
                        Update Password
                    </Button>
                </form>
            </Modal>

            {/* ACTIVE SESSIONS MODAL */}
            <Modal
                isOpen={isSessionsModalOpen}
                onClose={() => setIsSessionsModalOpen(false)}
                title="Manage Active Sessions"
                size="md"
                footer={null}
            >
                <div style={{ padding: "10px 0" }}>
                    <p className="small-text text-gray" style={{ marginBottom: "20px" }}>
                        These are the devices that have recently logged into your account. You can log out of any session individually or revoke all other sessions.
                    </p>

                    <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "24px" }}>
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "16px",
                                    border: "1px solid #f1f5f9",
                                    borderRadius: "12px",
                                    marginBottom: "12px"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backgroundColor: session.isCurrent ? "#dcfce7" : "#f1f5f9",
                                            color: session.isCurrent ? "#15803d" : "#475569",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {session.device.includes("iPhone") || session.device.includes("Android") ? (
                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ fontSize: "14.5px", fontWeight: "600", color: "#334155" }}>
                                                {session.device} • {session.browser}
                                            </span>
                                            {session.isCurrent && (
                                                <span
                                                    style={{
                                                        backgroundColor: "#dcfce7",
                                                        color: "#15803d",
                                                        fontSize: "10px",
                                                        fontWeight: "700",
                                                        padding: "2px 8px",
                                                        borderRadius: "9999px",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ fontSize: "12.5px", color: "#64748b", margin: "2px 0 0 0" }}>
                                            {session.location} • {session.activeTime}
                                        </p>
                                    </div>
                                </div>

                                {!session.isCurrent && (
                                    <button
                                        onClick={() => handleRevokeSession(session.id)}
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                            color: "#ef4444",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            padding: "4px 8px"
                                        }}
                                    >
                                        Log Out
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {sessions.length > 1 && (
                        <button
                            onClick={handleRevokeAllSessions}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #fecaca",
                                backgroundColor: "#fef2f2",
                                color: "#dc2626",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}
                        >
                            Log Out From All Other Devices
                        </button>
                    )}
                </div>
            </Modal>

            {/* TOAST NOTIFICATION */}
            <div className={`toast-notification ${toast.show ? "show" : ""}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{toast.message}</span>
            </div>
        </div>
    );
};

export default Profile;
