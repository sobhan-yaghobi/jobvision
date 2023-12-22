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
    const { data: companiesQuery, status: companiesStatus } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => await supabaseFetch.get<companyType[]>("companies?select=*").then((res) => res.data),
        enabled: props.mode === "array",
    });

    const { data: companyQuery, status: companyStatus } = useQuery({
        queryKey: ["company"],
        queryFn: async () =>
            await supabaseFetch
                .get<companyType>(`companies?select=*&id=eq.${props.mode === "single" ? props.id : ""}`)
                .then((res) => res.data),
        enabled: props.mode === "single",
    });

    return {
        companies: typeof companiesQuery !== "undefined" ? companiesQuery : ([] as companyType[]),
        company: typeof companyQuery !== "undefined" ? companyQuery : ({} as companyType),
        isLoading:
            (props.mode === "array" && companiesStatus === "success") ||
            (props.mode === "single" && companyStatus === "success")
                ? false
                : true,
    };
};

export default useCompanies;
