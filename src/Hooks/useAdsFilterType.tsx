import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { selectedFiltersType } from "../Components/JobsFilter/JobsFilter.type";
const useAdsFilterType = () => {
    const { data: filterTypes, status: filterTypesStatus } = useQuery({
        queryKey: ["filter_types"],
        queryFn: async () =>
            await supabaseFetch.get<selectedFiltersType[]>("filter_types?select=*").then((res) => res.data),
    });
    return {
        filterTypes: typeof filterTypes !== "undefined" ? filterTypes : ([] as selectedFiltersType[]),
        isLoading: filterTypesStatus === "success" ? false : true,
    };
};

export default useAdsFilterType;
