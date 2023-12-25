import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getItem } from "../Utils/Utils";

type ParnetLinks = "cmsEmployer" | "Advertsisings";
type PageLinks = "main_home" | "edit_home" | "main_advertising" | "add_advertising";

type itemPageType = {
    parentLink: ParnetLinks;
    key: PageLinks;
    label: string;
    isMain?: boolean;
};

const itemPage: itemPageType[] = [
    {
        label: "صفحه اصلی",
        key: "main_home",
        parentLink: "cmsEmployer",
        isMain: true,
    },
    {
        label: "درباره شرکت",
        key: "edit_home",
        parentLink: "cmsEmployer",
    },
    {
        label: "آگهی ها",
        key: "main_advertising",
        parentLink: "Advertsisings",
        isMain: true,
    },
    {
        label: "آگهی جدید",
        key: "add_advertising",
        parentLink: "Advertsisings",
    },
];

const useItemCmsPage = () => {
    const [route, setRoute] = useSearchParams({ page: "" });
    const { pathname } = useLocation();
    const [mainItems, setMainItems] = useState([] as itemPageType[]);
    const setMainRouteAction = ({ item }: { item: itemPageType | undefined }) =>
        typeof item !== "undefined" ? setRoute((prev) => ({ ...prev, page: item?.key })) : null;

    const itemClickAction = ({ key }: { key: itemPageType["key"] }) => {
        setRoute((prev) => ({ ...prev, page: key }));
    };
    const getPageQuery = () => route.get("page") ?? "";

    useEffect(() => {
        const pageFromQuery = getPageQuery();
        const lastPath = pathname.split("/").at(-1) ?? "";
        const mainItemsOfPage = getItem({
            array: itemPage,
            key: "parentLink",
            main_id: lastPath,
        });
        const mainItemByIsMain = mainItemsOfPage.filter((item) => item.isMain).at(0);

        if (pageFromQuery?.length === 0) {
            setMainRouteAction({ item: mainItemByIsMain });
        } else {
            const mainItem = getItem({ array: mainItemsOfPage, key: "key", main_id: pageFromQuery }).at(0);
            if (typeof mainItem === "undefined") {
                setMainRouteAction({ item: mainItemByIsMain });
            }
        }
        setMainItems(mainItemsOfPage);
    }, [pathname, getPageQuery()]);

    return { list: mainItems, clickItemHandler: itemClickAction, mainItemKey: getPageQuery() as PageLinks };
};

export default useItemCmsPage;
