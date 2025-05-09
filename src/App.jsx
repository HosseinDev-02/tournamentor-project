import { BrowserRouter, Navigate, Route, Router, RouterProvider, Routes, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const AppRoutes = () => {
    const routing = useRoutes(routes)
    return routing
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
