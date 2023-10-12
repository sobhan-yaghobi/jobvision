import React, { PropsWithChildren, SetStateAction, createContext, useState } from "react";

type TypeAuthContext = {
    isLogin: boolean;
    loginModalShow: boolean;
    setLoginModal: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as TypeAuthContext);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(false);
    return (
        <AuthContext.Provider
            value={{ isLogin: isUserLogin, loginModalShow: isLoginModal, setLoginModal: setIsLoginModal }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
