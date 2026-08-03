import { useMutation } from "@tanstack/react-query";
import { verifyOtpUser } from "../api/authApi";

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyOtpUser,
    });
};
