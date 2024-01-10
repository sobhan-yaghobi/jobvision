import { create } from "zustand";
import { setLocalStorage } from "../Utils/Utils";
export type userInfo = {
    email_or_phoneNumber: string;
    password: string;
    company_id: string | null;
};

type useAuthStateType = {
    userInfo: userInfo | undefined;
    isLoggedIn: boolean;
};

export type useAuthActionType = {
    setUserInfo: (userInfo: useAuthStateType["userInfo"]) => void;
};

const useAuth = create<useAuthStateType & useAuthActionType>((set) => ({
    userInfo: undefined,
    isLoggedIn: false,
    setUserInfo: (main_userInfo) => {
        if (typeof main_userInfo !== "undefined") {
            set({ userInfo: main_userInfo, isLoggedIn: true });
            setLocalStorage({ key: "user", value: main_userInfo });
        } else {
            set({ userInfo: main_userInfo, isLoggedIn: false });
            setLocalStorage({ key: "user", value: main_userInfo });
        }
    },
}));

export default useAuth;
