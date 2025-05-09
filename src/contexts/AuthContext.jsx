import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useLogOutUserMutation, useLoggedInUserQuery, useLoginUserMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { apiSlice } from "../redux/api/apiSlice";

const AuthContext = createContext({
    userInfo: {},
    loggedIn: false,
    userToken: null,
    login: () => {},
    logOut: () => {},
});

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginUser] = useLoginUserMutation();
    const [logOutUser] = useLogOutUserMutation()
    const dispatch = useDispatch()

    // console.log('Logged In User :', loggedInUserResult)

    const login = async (userData, navigate) => {
        try {
            const response = await loginUser(userData).unwrap();
            if (response?.httpCode === 200) {
                Swal.fire({
                    title: "می توانید وارد شوید",
                    icon: "success",
                    confirmButtonText: "ورود",
                }).then((response) => {
                    if (response?.isConfirmed) {
                        setUserLoggedIn(true);
                        localStorage.setItem("authStatus", "true");
                        dispatch(apiSlice.util.resetApiState())  // پاک کردن درخواست های قبلی به خاطر کش
                        navigate("/");
                    }
                });
            } else {
                throw new Error("هنگام ورود خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "نمی توانید وارد شوید",
                icon: "error",
                confirmButtonText: "بستن",
            });
        }
    };

    const logOut = async (navigate) => {
        try {
            const response = await logOutUser().unwrap();
            if (response?.httpCode === 200) {
                Swal.fire({
                    title: "با موفقیت خارج شدین",
                    icon: "success",
                    confirmButtonText: "فهمیدم",
                }).then((response) => {
                    if (response?.isConfirmed) {
                        setUserLoggedIn(true);
                        localStorage.setItem("authStatus", "false");
                        navigate("/login");
                    }
                });
            } else {
                throw new Error("هنگام خروج خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "نمی توانید خارج شوید",
                icon: "error",
                confirmButtonText: "بستن",
            });
        }
    };


    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem("authStatus");

        if (isUserLoggedIn === "true") {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
        // setUserLoggedIn(isUserLoggedIn)
        setLoading(false);
        console.log("isUserLoggedIn :", isUserLoggedIn);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                loggedIn: userLoggedIn,
                login,
                logOut,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
