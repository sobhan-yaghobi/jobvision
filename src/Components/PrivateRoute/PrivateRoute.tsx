import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../Store/useAuth";
import useLoginModal from "../../Store/useLoginModal";

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const { setIsShow } = useLoginModal();
    useEffect(() => {
        if (!isLoggedIn) {
            setIsShow(true);
        }
    }, [isLoggedIn, setIsShow]);

    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
