import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/admin-panel/Input/Input.jsx";
import Box from "../../../components/admin-panel/Box/Box.jsx";
import PrimaryButton from "../../../components/admin-panel/PrimaryButton/PrimaryButton.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth()

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        const userData = {
            userName: username,
            password: password,
        };

        login(userData, navigate)
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-50">
            <Box className="!h-auto">
                <form
                    onSubmit={loginSubmitHandler}
                    className="flex flex-col gap-4"
                    action="#"
                >
                    <h3 className="font-Estedad-Bold text-xl text-black text-center">
                        ورود ادمین
                    </h3>
                    <Input
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="نام کاربری را وارد کنید"
                        type="text"
                        label="نام کاربری"
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="رمز عبور را وارد کنید"
                        type="password"
                        label="رمز عبور"
                    />
                    <PrimaryButton title="ورود" />
                </form>
            </Box>
        </div>
    );
}

export default Login;
