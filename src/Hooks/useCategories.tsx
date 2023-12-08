import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { getItem } from "../Utils/Utils";

type categoryType = {
    created_at: string;
    id: string;
    item_id: string;
    link: string;
    title: string;
};

export interface categoriesMergeArrayType extends categoryType {
    sublinks: tagType[];
}

type tagType = {
    category_id: string;
    created_at: string;
    id: string;
    title: string;
};

const useCategories = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["categories"],
                queryFn: async () =>
                    await supabaseFetch.get<categoryType[]>("categories?select=*").then((res) => res.data),
                select: (data: categoryType[]) => data,
            },
            {
                queryKey: ["tags"],
                queryFn: async () => await supabaseFetch.get<tagType[]>("tags?select=*").then((res) => res.data),
                select: (data: tagType[]) => data,
            },
        ],
    });
    const categories = data[0].data;
    const tags = data[1].data;
    const categoriesMergeArray: categoriesMergeArrayType[] =
        typeof categories !== "undefined" && Array.isArray(categories)
            ? [...categories].map((item) => ({
                  ...item,
                  sublinks: getItem({ main_id: item.id, key: "category_id", array: tags }),
              }))
            : ([] as categoriesMergeArrayType[]);

    return { categories, tags, categoriesMergeArray };
};

export default useCategories;
