import {Navigate} from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import Loading from "../../../pages/admin-panel/Loading/Loading.jsx";
import { useLoggedInUserQuery } from "../../../redux/api/authApi.js";

const ProtectedRoute = ({ children }) => {
    const { data: loggedInUserResult, isLoading } = useLoggedInUserQuery(undefined, {
        refetchOnMountOrArgChange: true // درخواست مجدد هنگام لود شدن کامپوننت
    })

    console.log('User Status :', {loggedInUserResult, isLoading})

    if(isLoading) {
        return <Loading />
    }

    if(loggedInUserResult?.httpCode !== 200) {
        return <Navigate to='/login' replace/>
    }

    return children
}

export default ProtectedRoute