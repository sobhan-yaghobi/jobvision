import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";

export type companyType = {
    compnay_slogan: string;
    created_at: string;
    desc: string;
    established_year: number;
    id: string;
    industry: string;
    location: string;
    logo: string;
    name: string;
    organization_employ: number;
    score_company: number;
    score_experience_of_job_seekers: number;
    score_popularity: number;
    score_responsiveness: number;
    type_of_activity: string;
    website: string;
};

type useCompaniesProps =
    | { mode: "single"; id: string }
    | {
          mode: "array";
      };

const useCompanies = (props: useCompaniesProps) => {
    const { data: companies } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => await supabaseFetch.get<companyType[]>("companies?select=*").then((res) => res.data),
    });

    const { data: company } = useQuery({
        queryKey: ["company"],
        queryFn: async () =>
            await supabaseFetch
                .get<companyType>(`companies?select=*&id=eq.${props.mode === "single" ? props.id : ""}`)
                .then((res) => res.data),
        enabled: props.mode === "single",
    });

    return { companies, company };
};

export default useCompanies;
