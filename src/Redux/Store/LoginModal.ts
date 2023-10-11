import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const Slice = createSlice({
    name: "Login",
    initialState: false,
    reducers: {
        setLoginModalStatus: (isShow, action: PayloadAction<boolean>) => (isShow = action.payload),
    },
});
export const { setLoginModalStatus } = Slice.actions;
export default Slice.reducer;
