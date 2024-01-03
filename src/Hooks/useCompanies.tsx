import { useMutation, useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import supabase from "../Services/supabase";
export type companyType = {
    compnay_slogan: string;
    created_at: string;
    desc: string;
    established_year: Date;
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
      }
    | {
          mode: "Mutate";
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
    const { data, mutate, isSuccess } = useMutation({
        mutationKey: ["company"],
        mutationFn: async (param: string) => {
            const { data: company } = await supabase
                .from("companies")
                .select("*")
                .eq("id", param)
                .returns<[companyType]>();
            return company?.at(0);
        },
    });

    return {
        companies: typeof companiesQuery !== "undefined" ? companiesQuery : ([] as companyType[]),
        company: typeof companyQuery !== "undefined" ? companyQuery : ({} as companyType),
        isLoading:
            (props.mode === "array" && companiesStatus === "success") ||
            (props.mode === "single" && companyStatus === "success")
                ? false
                : true,
        mutate: {
            mutateFn: mutate,
            data,
            isSuccess,
        },
    };
};

export default useCompanies;
