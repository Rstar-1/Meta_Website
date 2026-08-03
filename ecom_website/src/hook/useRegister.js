import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/authApi";
import { setAuth } from "../feature/authSlice";

export const useRegister = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data?.data?.user && data?.data?.token) {
                dispatch(setAuth(data.data));
            }
        },
    });
};
