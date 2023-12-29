import { useState } from "react";
import { TypeAdvertisingQuery } from "../Components/AdvertisingBox/AdvertisingBox.type";
import { supabase } from "../App";

export type adsBoxPostType = Omit<TypeAdvertisingQuery, "created_at" | "id">;

type usePostAdsToApiProps = {
    adsBox: adsBoxPostType;
};

const usePostAdsToApi = () => {
    const [isLoading, setIsLoading] = useState(true);
    const postAction = async ({ adsBox }: usePostAdsToApiProps) => {
        const { error } = await supabase.from("advertisings").insert([{ ...adsBox }]);
        setIsLoading(typeof error !== "undefined" ? false : true);
    };
    return { postAction, isLoading };
};

export default usePostAdsToApi;
