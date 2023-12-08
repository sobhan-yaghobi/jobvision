import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import useCategories, { categoriesMergeArrayType } from "./useCategories";
import useProvinces, { provincesMergeArrayType } from "./useProvinces";
import { getItem } from "../Utils/Utils";
import { concat } from "lodash";

type menuType = {
    created_at: string;
    id: string;
    link: string;
    megaMenu: boolean;
    title: string;
};

interface menuMergeArrayType extends menuType {
    items: ItemType[];
}

type ItemType = {
    created_at: string;
    id: string;
    link: string;
    menu_id: string;
    title: string;
};

interface itemMergeArrayType extends ItemType {
    links: (categoriesMergeArrayType | provincesMergeArrayType)[];
}

const useMenuFetch = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["menu"],
                queryFn: async () => await supabaseFetch.get<menuType[]>("menu?select=*").then((res) => res.data),
            },
            {
                queryKey: ["item"],
                queryFn: async () => await supabaseFetch.get<ItemType[]>("item?select=*").then((res) => res.data),
            },
        ],
    });
    const menu = data[0].data;
    const item = data[1].data;
    const { categoriesMergeArray } = useCategories();
    const { provincesMergeArray } = useProvinces();

    const itemMergeArray: itemMergeArrayType[] = Array.isArray(item)
        ? [...item].map((Item) => ({
              ...Item,
              links: getItem({
                  main_id: Item.id,
                  key: "item_id",
                  array: concat<categoriesMergeArrayType | provincesMergeArrayType>(
                      categoriesMergeArray,
                      provincesMergeArray
                  ),
              }),
          }))
        : ([] as itemMergeArrayType[]);

    const menuMergeArray: menuMergeArrayType[] = Array.isArray(menu)
        ? [...menu].map((menuItem) => ({
              ...menuItem,
              items: getItem({
                  main_id: menuItem.id,
                  key: "menu_id",
                  array: itemMergeArray,
              }),
          }))
        : ([] as menuMergeArrayType[]);

    return { menu, item, menuMergeArray };
};

export default useMenuFetch;
