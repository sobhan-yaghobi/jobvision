import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { TypeAdvertising, TypeAdvertisingQuery } from "../Components/AdvertisingBox/AdvertisingBox.type";
type useAdvertisingsProps = { mode: "single"; company_id: string } | { mode: "array" };
const useAdvertisings = (props: useAdvertisingsProps) => {
    const { data: advertisingsQuery, status: advertisingsStatus } = useQuery({
        queryKey: ["advertisings"],
        queryFn: async () =>
            await supabaseFetch.get<TypeAdvertisingQuery[]>("advertisings?select=*").then((res) => res.data),
        enabled: props.mode === "array",
    });
    const { data: advertisingQuery, status: advertisingStatus } = useQuery({
        queryKey: ["advertising", props.mode === "single" ? props.company_id : ""],
        queryFn: async () =>
            await supabaseFetch
                .get<TypeAdvertisingQuery>(
                    `advertisings?select=*&company_id=eq.${props.mode === "single" ? props.company_id : ""}`
                )
                .then((res) => res.data),
        enabled: props.mode === "single",
    });

    return {
        advertisings: advertisingsQuery ?? ([] as TypeAdvertising[]),
        advertising: advertisingQuery ?? ({} as TypeAdvertising),
        isLoading:
            (props.mode === "array" && advertisingsStatus === "success") ||
            (props.mode === "single" && advertisingStatus === "success")
                ? false
                : true,
    };
};
export default useAdvertisings;
