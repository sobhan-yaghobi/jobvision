import { create } from "zustand";

type useLoginStateType = {
    isShow: boolean;
};

type useLoginActionType = {
    setIsShow: (isShow: boolean) => void;
};

const useLoginModal = create<useLoginStateType & useLoginActionType>((set) => ({
    isShow: false,
    setIsShow: (isShow) => set({ isShow }),
}));

export default useLoginModal;
