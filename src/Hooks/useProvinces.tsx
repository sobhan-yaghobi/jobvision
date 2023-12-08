import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { getItem } from "../Utils/Utils";

type provinceType = {
    created_at: string;
    id: string;
    item_id: string;
    link: string;
    title: string;
};

export interface provincesMergeArrayType extends provinceType {
    sublinks: cityType[];
}

type cityType = {
    created_at: string;
    id: string;
    link: string;
    province_id: string;
    title: string;
};

const useProvinces = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["provinces"],
                queryFn: async () =>
                    await supabaseFetch.get<provinceType[]>("provinces?select=*").then((res) => res.data),
            },
            {
                queryKey: ["cities"],
                queryFn: async () => await supabaseFetch.get<cityType[]>("cities?select=*").then((res) => res.data),
            },
        ],
    });
    const provinces = data[0].data;
    const cities = data[1].data;
    const provincesMergeArray: provincesMergeArrayType[] =
        typeof provinces !== "undefined" && Array.isArray(provinces)
            ? [...provinces].map((item) => ({
                  ...item,
                  sublinks: getItem({ main_id: item.id, key: "province_id", array: cities }),
              }))
            : ([] as provincesMergeArrayType[]);
    return { provinces, cities, provincesMergeArray };
};

export default useProvinces;
