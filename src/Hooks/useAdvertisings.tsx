import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";

type advertisingType = {
    ads_tags: string[];
    ads_types: string[];
    benefits: string[];
    benefits_and_facilities: string;
    business_trips: string | null;
    company_id: string;
    cooperation_ads_type: string;
    created_at: string;
    employment_conditions_education: string[];
    employment_conditions_gender: string;
    employment_conditions_softwares: string[];
    employment_conditions_years_old: [number, number];
    id: string;
    key_indicators: string[];
    rights_price: [number, number];
    status_cv_pending: boolean;
    status_is_important: boolean;
    status_responsible_employer: boolean;
    title: string;
    work_time: string;
};

type useAdvertisingsProps =
    | { mode: "single"; company_id: string }
    | {
          mode: "array";
      };

const useAdvertisings = (props: useAdvertisingsProps) => {
    const { data: advertisings } = useQuery({
        queryKey: ["advertisings"],
        queryFn: async () =>
            await supabaseFetch.get<advertisingType[]>("advertisings?select=*").then((res) => res.data),
        enabled: props.mode === "array",
    });
    const { data: advertising } = useQuery({
        queryKey: ["advertising", props.mode === "single" ? props.company_id : ""],
        queryFn: async () =>
            await supabaseFetch
                .get<advertisingType>(
                    `advertisings?select=*&company_id=eq.${props.mode === "single" ? props.company_id : ""}`
                )
                .then((res) => res.data),
        enabled: props.mode === "single",
    });

    return { advertisings, advertising };
};

export default useAdvertisings;
