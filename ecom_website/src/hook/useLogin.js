import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authApi";
import { setAuth } from "../features/authSlice";

export const useLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(setAuth(data.data));
        },
    });
};