import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { getItem } from "../Utils/Utils";
import { Type_Link, cityType, link } from "../Components/Menu/menu.type";

const useProvinces = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["provinces"],
                queryFn: async () => await supabaseFetch.get<Type_Link[]>("provinces?select=*").then((res) => res.data),
            },
            {
                queryKey: ["cities"],
                queryFn: async () => await supabaseFetch.get<cityType[]>("cities?select=*").then((res) => res.data),
            },
        ],
    });
    const provinces = data[0].data;
    const cities = data[1].data;
    const provincesMergeArray: link[] =
        typeof provinces !== "undefined" && Array.isArray(provinces)
            ? [...provinces].map((item) => ({
                  ...item,
                  sublinks: getItem({ main_id: item.id, key: "province_id", array: cities }),
              }))
            : ([] as link[]);
    return {
        provinces,
        cities,
        provincesMergeArray,
        isLoading: data[0].status === "success" && data[1].status === "success" ? false : true,
    };
};

export default useProvinces;
