import { configureStore } from "@reduxjs/toolkit";
import LoginModalSlice from "./Store/LoginModal";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const Store = configureStore({
    reducer: {
        LoginModal: LoginModalSlice,
    },
});

export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof Store.getState>> = useSelector;
