import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import { getItem } from "../Utils/Utils";
import { Type_Link, link, tagType } from "../Components/Menu/menu.type";

const useCategories = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["categories"],
                queryFn: async () =>
                    await supabaseFetch.get<Type_Link[]>("categories?select=*").then((res) => res.data),
                select: (data: Type_Link[]) => data,
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
    const categoriesMergeArray: link[] =
        typeof categories !== "undefined" && Array.isArray(categories)
            ? [...categories].map((item) => ({
                  ...item,
                  sublinks: getItem({ main_id: item.id, key: "category_id", array: tags }),
              }))
            : ([] as link[]);

    return {
        categories,
        tags,
        categoriesMergeArray,
        isLoading: data[0].status === "success" && data[1].status === "success" ? false : true,
    };
};

export default useCategories;
