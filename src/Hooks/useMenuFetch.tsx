import { useQueries } from "@tanstack/react-query";
import supabaseFetch from "../Services/supabaseFetch";
import useCategories from "./useCategories";
import useProvinces from "./useProvinces";
import { getItem } from "../Utils/Utils";
import { concat } from "lodash";
import { Type_Item, Type_Menu, itemLinks, link, menuItems } from "../Components/Menu/menu.type";

const useMenuFetch = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ["menu"],
                queryFn: async () => await supabaseFetch.get<Type_Menu[]>("menu?select=*").then((res) => res.data),
            },
            {
                queryKey: ["item"],
                queryFn: async () => await supabaseFetch.get<Type_Item[]>("item?select=*").then((res) => res.data),
            },
        ],
    });
    const menu = data[0].data;
    const item = data[1].data;
    const { categoriesMergeArray, isLoading: categoriesIsLoading } = useCategories();
    const { provincesMergeArray, isLoading: provincesIsLoading } = useProvinces();

    const itemMergeArray: itemLinks[] =
        Array.isArray(item) && !categoriesIsLoading && !provincesIsLoading
            ? [...item].map((Item) => ({
                  ...Item,
                  links: getItem({
                      main_id: Item.id,
                      key: "item_id",
                      array: concat<link>(categoriesMergeArray, provincesMergeArray),
                  }),
              }))
            : ([] as itemLinks[]);

    const menuMergeArray: menuItems[] = Array.isArray(menu)
        ? [...menu].map((menuItem) => ({
              ...menuItem,
              items: getItem({
                  main_id: menuItem.id,
                  key: "menu_id",
                  array: itemMergeArray,
              }),
          }))
        : ([] as menuItems[]);

    return { menu, item, menuMergeArray, isLoading: !categoriesIsLoading && !provincesIsLoading ? false : true };
};

export default useMenuFetch;
