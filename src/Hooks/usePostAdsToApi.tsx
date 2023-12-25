import React from "react";
import { useMutation } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { TypeAdvertisingQuery } from "../Components/AdvertisingBox/AdvertisingBox.type";

type usePostAdsToApiProps = {
    data: TypeAdvertisingQuery;
};
const usePostAdsToApi = ({ data }: usePostAdsToApiProps) => {
    const { isSuccess } = useMutation({
        mutationFn: async () =>
            await supabaseFetch.post("advertisings", data, {
                headers: {
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }),
    });
    return { isSuccess };
};

export default usePostAdsToApi;
