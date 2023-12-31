import { useState } from "react";
import { TypeAdvertisingQuery } from "../Components/AdvertisingBox/AdvertisingBox.type";
import supabase from "../Services/supabase";
export type adsBoxPostType = Omit<TypeAdvertisingQuery, "created_at" | "id">;
type usePostAdsToApiProps = {
    adsBox: adsBoxPostType;
    successFunctionHandler: () => void;
};
const usePostAdsToApi = () => {
    const postAction = async ({ adsBox, successFunctionHandler }: usePostAdsToApiProps) => {
        const { error } = await supabase.from("advertisings").insert([{ ...adsBox }]);
        if (typeof error !== "undefined") {
            successFunctionHandler();
        }
    };
    return { postAction };
};
export default usePostAdsToApi;
