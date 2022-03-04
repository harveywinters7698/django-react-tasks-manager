import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";

import { AuthContext } from "src/contexts/AuthContextProvider";
import getCommonOptions from "src/helpers/axios/getCommonOptions";

export default function useRequestAuth() {
    const [loading, setLoading] = useState(false);
    const [logoutPending, setLogoutPending] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleRequestError = useCallback((err) => {
        const formattedError = formatHttpApiError(err);
        setError(formattedError);
        enqueueSnackbar(formattedError);
        setLoading(false);
    }, [enqueueSnackbar, setLoading, setError])

    const requestResetPassword = useCallback((email, gRecaptchaRes) => {
        setLoading(true);
        axios.post("/api/auth/users/reset_password/", { email, g_recaptcha_response: gRecaptchaRes })
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Reset password link will be sent to the provided email")

            }).catch(handleRequestError)
    }, [enqueueSnackbar, handleRequestError])

    const resetPassword = useCallback((data, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/reset_password_confirm/", data)
            .then(() => {
                enqueueSnackbar("Successfully updated password");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleRequestError)
    }, [enqueueSnackbar, handleRequestError])

    const register = useCallback(({ username, email, password }, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/", {
            username,
            email,
            password
        })
            .then(() => {
                enqueueSnackbar("Sign up is successful, you can now sign in with your credentials");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleRequestError)
    }, [enqueueSnackbar, handleRequestError, setLoading])

    const login = useCallback(({ username, password }) => {
        setLoading(true);
        axios.post("/api/auth/token/login/", { username, password })
            .then((res) => {
                const { auth_token } = res.data;
                localStorage.setItem("authToken", auth_token);
                setLoading(false);
                setIsAuthenticated(true);
            }).catch(handleRequestError)
    }, [handleRequestError, setLoading, setIsAuthenticated])

    const logout = useCallback(() => {
        setLogoutPending(true);
        axios.post("/api/auth/token/logout/", null, getCommonOptions())
            .then(() => {
                localStorage.removeItem("authToken");
                setLogoutPending(false);
                setIsAuthenticated(false);
            })
            .catch((err) => {
                setLogoutPending(false);
                handleRequestError(err);
            })
    }, [handleRequestError, setLogoutPending, setIsAuthenticated])

    return {
        register,
        login,
        logout,
        logoutPending,
        loading,
        error,
        requestResetPassword,
        resetPassword
    }
}