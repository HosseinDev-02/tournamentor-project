import AdminPanel from "./pages/admin-panel/Index/Index";
import Index from "./pages/main/Index/Index";
import Users from "./pages/admin-panel/Users/Users";
import Games from "./pages/admin-panel/Games/Games";
import Genders from "./pages/admin-panel/Genders/Genders";
import Players from "./pages/admin-panel/Players/Players";
import Avatars from "./pages/admin-panel/Avatars/Avatars";
import Tournaments from "./pages/admin-panel/Tournaments/Tournaments";
import Teams from "./pages/admin-panel/Teams/Teams";
import Wallets from "./pages/admin-panel/Wallets/Wallets";
import Login from "./pages/admin-panel/Login/Login";
import ProtectedRoute from "./components/admin-panel/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/admin-panel/Dashboard/Dashboard";
import Transactions from "./pages/admin-panel/Transactions/Transactions";

let routes = [
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/admin-panel",
        element: (
            <ProtectedRoute>
                <AdminPanel />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "games", element: <Games /> },
            { path: "genders", element: <Genders /> },
            { path: "players", element: <Players /> },
            { path: "avatars", element: <Avatars /> },
            { path: "tournaments", element: <Tournaments /> },
            { path: "teams", element: <Teams /> },
            { path: "wallets", element: <Wallets /> },
            {
                path: "transactions/wallet/:walletId",
                element: <Transactions />,
            },
            { path: "transactions/user/:userId", element: <Transactions /> },
        ],
    },
    { path: "/login", element: <Login /> },
];

export default routes;
