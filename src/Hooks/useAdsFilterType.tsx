import { useQuery } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { selectedFiltersType } from "../Components/JobsFilter/JobsFilter.type";
const useAdsFilterType = () => {
    const { data: filterTypes } = useQuery({
        queryKey: ["filter_types"],
        queryFn: async () =>
            await supabaseFetch.get<selectedFiltersType[]>("filter_types?select=*").then((res) => res.data),
    });
    return typeof filterTypes === "undefined" ? { filterTypes: [] as selectedFiltersType[] } : { filterTypes };
};

export default useAdsFilterType;
