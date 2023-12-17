import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { TypeAdvertising, TypeAdvertisingQuery } from "../Components/AdvertisingBox/AdvertisingBox.type";
import useCompanies, { companyType } from "./useCompanies";
import { getItem } from "../Utils/Utils";
type useAdvertisingsProps = { mode: "single"; company_id: string } | { mode: "array" };
const useAdvertisings = (props: useAdvertisingsProps) => {
    const { data: advertisingsQuery } = useQuery({
        queryKey: ["advertisings"],
        queryFn: async () =>
            await supabaseFetch.get<TypeAdvertisingQuery[]>("advertisings?select=*").then((res) => res.data),
        enabled: props.mode === "array",
    });
    const { data: advertisingQuery } = useQuery({
        queryKey: ["advertising", props.mode === "single" ? props.company_id : ""],
        queryFn: async () =>
            await supabaseFetch
                .get<TypeAdvertisingQuery>(
                    `advertisings?select=*&company_id=eq.${props.mode === "single" ? props.company_id : ""}`
                )
                .then((res) => res.data),
        enabled: props.mode === "single",
    });
    const advertisings = advertisingsQuery ?? ([] as TypeAdvertising[]);
    const advertising = advertisingQuery ?? ({} as TypeAdvertising);

    return { advertisings, advertising };
};
export default useAdvertisings;
