import axiosInstance from "./axiosInstance";
import { handleRequest } from "./apiHandler";

// ================= LOGIN =================
export const loginUser = (data) =>
  handleRequest(() => axiosInstance.post("/auth/login", data));

// ================= REGISTER =================
export const registerUser = (data) =>
  handleRequest(() => axiosInstance.post("/auth/register", data));

// ================= VERIFY OTP =================
export const verifyOtpUser = (data) =>
  handleRequest(() => axiosInstance.post("/auth/verify-otp", data));

// ================= FORGOT PASSWORD =================
export const forgotPassword = (data) =>
  handleRequest(() => axiosInstance.post("/auth/forgot-password", data));

// ================= VERIFY FORGOT OTP =================
export const verifyForgotOtp = (data) =>
  handleRequest(() => axiosInstance.post("/auth/verify-forgot-otp", data));

// ================= RESET PASSWORD =================
export const resetPassword = (data) =>
  handleRequest(() => axiosInstance.post("/auth/reset-password", data));

// ================= LOGOUT =================
export const logoutUser = () =>
  handleRequest(() => axiosInstance.post("/auth/logout"));