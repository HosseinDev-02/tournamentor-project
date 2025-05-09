import Index from "./pages/Index/Index";
import Users from "./pages/Users/Users";
import Games from "./pages/Games/Games";
import Genders from "./pages/Genders/Genders";
import Players from "./pages/Players/Players";
import Avatars from "./pages/Avatars/Avatars";
import Tournaments from "./pages/Tournaments/Tournaments";
import Teams from "./pages/Teams/Teams";
import Wallets from "./pages/Wallets/Wallets";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";

let routes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Index />
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
            { path: "transactions/wallet/:walletId", element: <Transactions /> },
            { path: "transactions/user/:userId", element: <Transactions /> },
        ],
    },
    { path: "/login", element: <Login /> },
];

export default routes;
